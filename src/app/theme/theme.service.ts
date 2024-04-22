import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

type ThemeOptions = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: ThemeOptions = 'dark';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleDarkMode() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: ThemeOptions) {
    this.theme = theme;

    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = `${this.theme}.css`;
    }
  }
}
