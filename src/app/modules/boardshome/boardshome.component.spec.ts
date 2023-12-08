import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardshomeComponent } from './boardshome.component';

describe('BoardshomeComponent', () => {
  let component: BoardshomeComponent;
  let fixture: ComponentFixture<BoardshomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardshomeComponent]
    });
    fixture = TestBed.createComponent(BoardshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
