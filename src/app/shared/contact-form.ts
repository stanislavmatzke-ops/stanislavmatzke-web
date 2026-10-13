import { Component, inject, signal } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { SITE } from '../core/site';

/**
 * Kontaktní formulář.
 * Zatím otevře e-mailový program s předvyplněnou zprávou (funguje i lokálně).
 * Při nasazení nahradíme voláním .NET funkce, která pošle e-mail přes Azure Communication Services.
 */
@Component({
  selector: 'app-contact-form',
  template: `
    @let f = i18n.t().contact.form;
    <form class="form card" (submit)="send($event)">
      <div class="form__row">
        <label class="field">{{ f.name }}
          <input name="name" type="text" autocomplete="name" required />
        </label>
        <label class="field">{{ f.email }}
          <input name="email" type="email" autocomplete="email" required />
        </label>
      </div>
      <label class="field">{{ f.company }}
        <input name="company" type="text" autocomplete="organization" />
      </label>
      <label class="field">{{ f.message }}
        <textarea name="message" rows="5" required></textarea>
      </label>
      <!-- past na roboty: člověk pole nevidí ani nevyplní -->
      <label class="hp" aria-hidden="true">Web <input name="website" type="text" tabindex="-1" autocomplete="off" /></label>
      <button type="submit" class="btn btn--primary">{{ f.submit }}</button>
      @if (sent()) {
        <p class="form__status" role="status">{{ f.sent }}</p>
      } @else {
        <p class="form__note">{{ f.note }}</p>
      }
    </form>
  `,
})
export class ContactForm {
  protected readonly i18n = inject(I18n);
  protected readonly sent = signal(false);

  send(event: Event): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    if (data.get('website')) return;
    const f = this.i18n.t().contact.form;
    const name = String(data.get('name') ?? '');
    const company = String(data.get('company') ?? '');
    const body = [String(data.get('message') ?? ''), '', '—', name, company, String(data.get('email') ?? '')]
      .filter((line, i) => i < 3 || line)
      .join('\n');
    const subject = `${f.subject}: ${name}${company ? ` (${company})` : ''}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.sent.set(true);
  }
}
