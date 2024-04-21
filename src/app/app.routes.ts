import { Route } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
];
