import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

import { SkeletonModule } from 'primeng/skeleton';
import { UserProfile } from './user-profile.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(private apiService: ApiService) {}

  get isProfileLoading(): boolean {
    return this.apiService.isProfileLoading;
  }

  get userProfile(): UserProfile | null {
    return this.apiService.userProfile;
  }

  get username(): string {
    return this.apiService.currentUsername;
  }
}
