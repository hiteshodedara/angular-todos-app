import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedviewComponent } from './unauthorizedview.component';

describe('UnauthorizedviewComponent', () => {
  let component: UnauthorizedviewComponent;
  let fixture: ComponentFixture<UnauthorizedviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorizedviewComponent]
    });
    fixture = TestBed.createComponent(UnauthorizedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
