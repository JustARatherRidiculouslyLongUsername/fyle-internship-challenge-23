import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Repo } from '../repo.model';

import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-repo-tile',
  standalone: true,
  imports: [CardModule, SkeletonModule, TagModule],
  templateUrl: './repo-tile.component.html',
  styleUrls: ['./repo-tile.component.scss'],
})
export class RepoTileComponent {
  constructor(private apiService: ApiService) {}

  @Input() repo?: Repo;

  get loading() {
    return this.apiService.isLoading;
  }
}
