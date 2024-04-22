import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { UserProfile } from '../user-profile/user-profile.model';
import { Repo } from '../repos/repo.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private octokit = new Octokit({ auth: environment.githubAuthToken });

  public currentUsername = '';
  public currentPage = 0;
  public itemsPerPage = 10;

  public isProfileLoading = true;
  public isReposLoading = true;
  public is404 = false;
  public repos: Repo[] | null = null;
  public userProfile: UserProfile | null = null;

  constructor(private httpClient: HttpClient) {}

  searchUsers(query: string) {
    return this.octokit.rest.search.users({ q: query, per_page: 10, page: 1 });
  }

  /**
   * Get profile details of the last submitted username and set
   * isProfileLoading, is404 and userProfile as required
   * @returns {number} The status code of the GET operation
   */
  async getUser(): Promise<number> {
    console.log('fetching user profile...');
    this.isProfileLoading = true;
    this.is404 = false;
    return await this.octokit.rest.users
      .getByUsername({
        username: this.currentUsername,
      })
      .then((res) => {
        this.userProfile = {
          accountURL: res.data.html_url,
          profilePhotoURL: res.data.avatar_url,
          bio: res.data.bio,
          fullName: res.data.name,
          location: res.data.location,
          twitterHandle: res.data.twitter_username,
          reposCount: res.data.public_repos,
        };
        console.log({ profile: this.userProfile });
        return res.status;
      })
      .catch((reason) => {
        const { status } = reason;
        if (status === 404) {
          this.userProfile = null;
          this.is404 = true;
        } else {
          console.error('Unknown error', { reason });
        }
        return status as number;
      })
      .finally(() => {
        this.isProfileLoading = false;
      });
  }

  /**
   * Get repos of the last submitted username at the last selected
   * page and set isReposLoading, is404 and repos as required
   * @returns {number} The status code of the GET request
   */
  async getRepos(): Promise<number> {
    console.log('fetching repos...');
    this.isReposLoading = true;
    this.is404 = false;
    return await this.octokit.rest.repos
      .listForUser({
        username: this.currentUsername,
        per_page: this.itemsPerPage,
        page: this.currentPage + 1,
      })
      .then((res) => {
        this.repos = res.data.map<Repo>((repo) => ({
          name: repo.name,
          description: repo.description,
          topics: repo.topics,
          url: repo.html_url,
        }));

        console.table(this.repos);
        return res.status;
      })
      .catch((reason) => {
        const { status } = reason;
        if (status === 404) {
          this.repos = null;
          this.is404 = true;
        } else {
          console.error('Unknown error', { reason });
        }
        return status as number;
      })
      .finally(() => {
        this.isReposLoading = false;
      });
  }

  refresh(): void {
    this.getRepos();
    this.getUser();
  }

  get isLoading() {
    return this.isReposLoading || this.isProfileLoading;
  }
}
