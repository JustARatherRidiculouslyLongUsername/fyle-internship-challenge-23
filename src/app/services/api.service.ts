import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private itemsPerPage = 10;

  private octokit = new Octokit({ auth: environment.githubAuthToken });

  constructor(private httpClient: HttpClient) {}

  searchUsers(query: string) {
    return this.octokit.rest.search.users({ q: query, per_page: 10, page: 1 });
  }

  getUser(githubUsername: string) {
    return this.octokit.rest.users.getByUsername({
      username: githubUsername,
    });
  }

  getRepos(githubUsername: string, page: number) {
    return this.octokit.rest.repos.listForUser({
      username: githubUsername,
      per_page: this.itemsPerPage,
      page,
    });
  }

  setItemsPerPage(itemCount: number): void {
    this.itemsPerPage = itemCount;
  }
}
