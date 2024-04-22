import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { provideHttpClient } from '@angular/common/http';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load skeleton loaders correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    console.log({ compiled });
    console.log(compiled.querySelectorAll('p-skeleton'));
    console.log(compiled.querySelectorAll('p-skeleton').length);
    expect(compiled.querySelectorAll('p-skeleton').length).toEqual(6);
  });
});
