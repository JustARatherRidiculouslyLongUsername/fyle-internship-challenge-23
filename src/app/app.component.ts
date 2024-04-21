import { Component, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge';

  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);
  }
}
