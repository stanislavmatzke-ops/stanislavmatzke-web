import { Component, inject, signal } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';

type State = 'idle' | 'sending' | 'sent' | 'error' | 'rate';

/**
 * Kontaktní formulář. Odesílá na /api/contact (.NET funkce vedle webu), ta pošle e-mail
 * přes Azure Communication Services na kontakt@. Ochrana: past na roboty, minimální doba vyplnění,
 * limit zpráv na připojení a denní strop (vše hlídá server).
 */
@Component({
  selector: 'app-contact-form',
  template: `
    @let f = i18n.t().contact.form;
    <form class="form card" (submit)="send($event)">
      <div class="form__row">
        <label class="field">{{ f.name }}
          <input name="name" type="text" autocomplete="name" required minlength="2" maxlength="100" />
        </label>
        <label class="field">{{ f.email }}
          <input name="email" type="email" autocomplete="email" required maxlength="254" />
        </label>
      </div>
      <label class="field">{{ f.company }}
        <input name="company" type="text" autocomplete="organization" maxlength="150" />
      </label>
      <label class="field">{{ f.message }}
        <textarea name="message" rows="5" required minlength="10" maxlength="5000"></textarea>
      </label>
      <!-- past na roboty: člověk pole nevidí ani nevyplní -->
      <label class="hp" aria-hidden="true">Web <input name="website" type="text" tabindex="-1" autocomplete="off" /></label>
      <button type="submit" class="btn btn--primary" [disabled]="state() === 'sending'">
        {{ state() === 'sending' ? f.sending : f.submit }}
      </button>
      @switch (state()) {
        @case ('sent') {
          <p class="form__status" role="status">{{ f.sent }}</p>
        }
        @case ('error') {
          <p class="form__status form__status--error" role="alert">
            {{ f.error }} <a [href]="'mailto:' + site.email">{{ site.email }}</a>.
          </p>
        }
        @case ('rate') {
          <p class="form__status form__status--error" role="alert">
            {{ f.rateLimited }} <a [href]="'mailto:' + site.email">{{ site.email }}</a>.
          </p>
        }
        @default {
          <p class="form__note">{{ f.note }}</p>
        }
      }
    </form>
  `,
})
export class ContactForm {
  protected readonly i18n = inject(I18n);
  protected readonly site = SITE;
  protected readonly state = signal<State>('idle');
  private readonly openedAt = Date.now();

  async send(event: Event): Promise<void> {
    event.preventDefault();
    if (this.state() === 'sending') return;
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? '');

    this.state.set('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: field('name'),
          email: field('email'),
          company: field('company'),
          message: field('message'),
          website: field('website'),
          elapsedMs: Date.now() - this.openedAt,
          lang: this.i18n.lang(),
        }),
      });
      if (res.ok) {
        form.reset();
        this.state.set('sent');
      } else {
        this.state.set(res.status === 429 ? 'rate' : 'error');
      }
    } catch {
      this.state.set('error');
    }
  }
}
