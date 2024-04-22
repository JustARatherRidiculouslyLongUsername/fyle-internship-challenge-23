import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repo-tile',
  standalone: true,
  imports: [CardModule, SkeletonModule],
  templateUrl: './repo-tile.component.html',
  styleUrls: ['./repo-tile.component.scss'],
})
export class RepoTileComponent {
  constructor(private apiService: ApiService) {}

  get loading() {
    return this.apiService.isLoading;
  }
}
