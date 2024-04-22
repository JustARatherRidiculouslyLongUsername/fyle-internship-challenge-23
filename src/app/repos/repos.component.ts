import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoTileComponent } from './repo-tile/repo-tile.component';
import { Repo } from './repo.model';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [CommonModule, RepoTileComponent, PaginatorModule],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  first = 0;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {}

  async refreshRepos(): Promise<void> {
    this.apiService.isReposLoading = true;

    await this.apiService.getRepos();

    this.apiService.isReposLoading = false;
  }

  // Fired when the current page or items per page is changed
  onPageChange(event: PaginatorState) {
    console.table(event);

    const rowsChanged =
      event.rows !== undefined && event.rows !== this.apiService.itemsPerPage;
    const pageChanged =
      event.page !== undefined && event.page !== this.apiService.currentPage;

    if (rowsChanged) {
      this.apiService.itemsPerPage = event.rows!;
    }
    if (pageChanged) {
      this.apiService.currentPage = event.page!;
    }

    this.first = event.first!;
    console.log({
      first: this.first,
      currentPage: this.apiService.currentPage,
      rows: this.apiService.itemsPerPage,
    });
    if (rowsChanged || pageChanged) {
      this.refreshRepos();
    }
  }

  get loading(): boolean {
    return this.apiService.isLoading;
  }

  get error(): boolean {
    return this.apiService.is404;
  }

  get repos(): Repo[] | null {
    return this.apiService.repos;
  }

  get reposPerPage(): number {
    return this.apiService.itemsPerPage;
  }

  get totalRecords(): number {
    return this.apiService.userProfile?.reposCount || 75;
  }
}
