import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SearchBarComponent } from '../search/search-bar/search-bar.component';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAtTop = true;

  constructor(private themeService: ThemeService) {}

  handleDarkModeButtonClicked() {
    this.themeService.toggleDarkMode();
  }
}
