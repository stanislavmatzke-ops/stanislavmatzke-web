import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

/**
 * Světlý / tmavý režim. Výchozí je světlý; volba se pamatuje v prohlížeči.
 * Počáteční stav nastavuje už inline skript v index.html (bez probliknutí).
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.doc.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    if (next === 'dark') this.doc.documentElement.setAttribute('data-theme', 'dark');
    else this.doc.documentElement.removeAttribute('data-theme');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // soukromé okno nebo zakázané úložiště – režim platí jen do zavření stránky
    }
  }
}
