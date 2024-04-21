import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

import { RouterLink, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, SearchBarComponent],
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);
  }
}
