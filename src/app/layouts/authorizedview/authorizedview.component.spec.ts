import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedviewComponent } from './authorizedview.component';

describe('AuthorizedviewComponent', () => {
  let component: AuthorizedviewComponent;
  let fixture: ComponentFixture<AuthorizedviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizedviewComponent]
    });
    fixture = TestBed.createComponent(AuthorizedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
