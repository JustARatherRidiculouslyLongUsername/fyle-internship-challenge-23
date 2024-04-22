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
  query = signal<string | null>(null);
  loading = true;
  userProfile: UserProfile | null = null;
  repos: Repo[] = [];
  currentPage = 1;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    effect(() => {
      // Every time a new query is entered, attempt to get the user
      const q = this.query();
      if (!q || q.length === 0) {
        this.userProfile = null;
        this.loading = false;
        return;
      }
      // this.fetchUserProfile(q);
      // this.fetchRepos(q);
    });
  }

  reset(): void {
    this.loading = true;
    this.userProfile = null;
    this.repos = [];
  }

  async fetchUserProfile(q: string) {
    this.apiService
      .getUser(q)
      .then((res) => {
        this.userProfile = {
          accountURL: res.data.html_url,
          profilePhotoURL: res.data.avatar_url,
          bio: res.data.bio,
          fullName: res.data.name,
          location: res.data.location,
          twitterHandle: res.data.twitter_username,
        };
        this.loading = false;
      })
      .catch((reason) => {
        const { status } = reason;
        if (status === 404) {
          this.userProfile = null;
          this.loading = false;
        } else {
          console.error('Unknown error', { reason });
        }
      });
  }

  async fetchRepos(q: string) {
    this.apiService.getRepos(q, this.currentPage);
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query.set(params.get('q'));
    });
  }

  found = true;
}
