import { Component, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);

    // If the user has explicitly turned dark mode on,
    // or if the system preferences have been set to dark mode,
    // set the page to dark theme.
    if (
      window.localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
