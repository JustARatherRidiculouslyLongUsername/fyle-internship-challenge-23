import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoTileComponent } from './repo-tile/repo-tile.component';
import { Repo } from './repo.model';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [CommonModule, RepoTileComponent, PaginatorModule],
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent {
  totalRecords = 75;
  reposPerPage = 10;
  first = 0;

  @Input() loading = true;
  @Input() repos: Repo[] = [];

  // Fired when the current page or pages per page is changed
  onPageChange(event: PaginatorState) {
    // if (event.rows != this.rows)
  }
}
