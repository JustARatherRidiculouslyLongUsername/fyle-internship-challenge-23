import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AutoCompleteDropdownClickEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

type AutoCompleteCompleteEvent = {
  query: string;
};

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  selectedItem: any;

  suggestions: string[] = [];

  async attemptAutoComplete(event: AutoCompleteCompleteEvent) {
    if (event.query.length < 3) {
      return;
    }

    console.log(`fetching users (q=${event.query})...`);
    const res = await this.apiService.searchUsers(event.query);

    this.suggestions = res.data.items.map((item) => item.login);
  }

  onSubmit() {
    this.router.navigate(['search'], { queryParams: { q: this.selectedItem } });
    console.log({ item: this.selectedItem });
  }

  @HostListener('keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.onSubmit();
  }
}
