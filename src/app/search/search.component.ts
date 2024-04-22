import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

import { RepoTileComponent } from '../repos/repo-tile/repo-tile.component';
import { ReposComponent } from '../repos/repos.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    NavbarComponent,
    RepoTileComponent,
    ReposComponent,
    UserProfileComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.apiService.currentUsername = params.get('q')!;
      this.apiService.refresh();
    });
  }

  get is404(): boolean {
    return this.apiService.is404;
  }
}
