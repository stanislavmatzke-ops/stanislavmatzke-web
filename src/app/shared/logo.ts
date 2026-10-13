import { Component, input } from '@angular/core';

/**
 * Logo. Varianta se volí v hlavičce (`variant`), návrhy jsou na plátně
 * „Web stanislavmatzke.com – úvodní stránka“ (artboard Loga).
 */
@Component({
  selector: 'app-logo',
  template: `
    @switch (variant()) {
      @case ('tag') {
        <span class="logo logo--tag" aria-hidden="true"><span class="logo__punct">&lt;</span>sm<span class="logo__punct">/&gt;</span></span>
      }
      @case ('prompt') {
        <span class="logo logo--prompt" aria-hidden="true"><span class="logo__punct">&gt;</span>sm<span class="logo__cursor"></span></span>
      }
      @case ('braces') {
        <span class="logo logo--braces" aria-hidden="true"><span class="logo__punct">{{ '{' }}</span>sm<span class="logo__punct">{{ '}' }}</span></span>
      }
    }
  `,
})
export class Logo {
  readonly variant = input<'tag' | 'prompt' | 'braces'>('tag');
}
