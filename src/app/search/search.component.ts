import { Component, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserProfile } from '../user-profile/user-profile.model';

import { SkeletonModule } from 'primeng/skeleton';
import { RepoTileComponent } from '../repos/repo-tile/repo-tile.component';
import { ReposComponent } from '../repos/repos.component';
import { Repo } from '../repos/repo.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    NavbarComponent,
    SkeletonModule,
    RepoTileComponent,
    ReposComponent,
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

  get userProfile(): UserProfile | null {
    return this.apiService.userProfile;
  }

  get isProfileLoading(): boolean {
    return this.apiService.isProfileLoading;
  }
  get is404(): boolean {
    return this.apiService.is404;
  }
}
