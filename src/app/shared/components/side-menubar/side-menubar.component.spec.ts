import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenubarComponent } from './side-menubar.component';

describe('SideMenubarComponent', () => {
  let component: SideMenubarComponent;
  let fixture: ComponentFixture<SideMenubarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenubarComponent]
    });
    fixture = TestBed.createComponent(SideMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
