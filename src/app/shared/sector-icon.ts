import { Component, input } from '@angular/core';
import { Sector } from '../i18n/types';

/** Ikona odvětví u reference (jednoduché linkové SVG). */
@Component({
  selector: 'app-sector-icon',
  template: `
    <svg class="sector-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (sector()) {
        @case ('logistics') {
          <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" />
        }
        @case ('health') {
          <path d="M3 12h4l2-5 4 10 2-5h6" />
        }
        @case ('public') {
          <path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" />
        }
        @case ('finance') {
          <path d="M3 20h18" /><path d="m4 15 5-5 4 3 7-7" /><path d="M15 6h5v5" />
        }
        @case ('bank') {
          <path d="M3 9.5 12 4l9 5.5" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
        }
        @case ('asset') {
          <path d="M12 3a9 9 0 1 0 9 9h-9z" /><path d="M15 3.5A9 9 0 0 1 20.5 9H15z" />
        }
        @case ('telecom') {
          <path d="M12 20v-8" /><circle cx="12" cy="10" r="1.6" /><path d="M8.5 6.5a5 5 0 0 0 0 7M15.5 6.5a5 5 0 0 1 0 7M5.6 3.8a9 9 0 0 0 0 12.4M18.4 3.8a9 9 0 0 1 0 12.4" />
        }
        @case ('erp') {
          <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
        }
      }
    </svg>
  `,
})
export class SectorIcon {
  readonly sector = input.required<Sector>();
}
