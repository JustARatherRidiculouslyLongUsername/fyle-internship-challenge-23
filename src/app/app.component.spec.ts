import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fyle-frontend-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge');
  });

  // Routes should render the correct component
  // Search bar should redirect to the correct page on autocomplete, text entered, or button click
  // Search page should show a valid empty state on invalid user
  // Search page should show the correct repos for a valid user
  // All links (repo, user, tags) should match the api
});
