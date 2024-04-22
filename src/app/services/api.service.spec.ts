import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Octokit } from 'octokit';
import { environment } from '../environment/environment';

describe('ApiService', () => {
  let octokit = new Octokit({ auth: environment.githubAuthToken });
  let service: ApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to search for users', async () => {
    let res = await service.searchUsers('abc');
    expect(res.data.total_count).toBeGreaterThanOrEqual(1);
  });

  it('should return the same values as the API', async () => {
    service.currentUsername = 'johnpapa';
    let status = await service.getUser();

    let real_url = (
      await octokit.rest.users.getByUsername({
        username: 'johnpapa',
      })
    ).data.html_url;

    expect(status).toEqual(200);
    expect(service.userProfile?.accountURL).toEqual(real_url);
  });
});
