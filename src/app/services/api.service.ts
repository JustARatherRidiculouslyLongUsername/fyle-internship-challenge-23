import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  octokit = new Octokit({ auth: environment.githubAuthToken });

  constructor(private httpClient: HttpClient) {}

  searchUsers(query: string) {
    return this.octokit.rest.search.users({ q: query, per_page: 10, page: 1 });
  }

  async getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}
