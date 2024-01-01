import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardItemsComponent } from './board-items.component';

describe('BoardItemsComponent', () => {
  let component: BoardItemsComponent;
  let fixture: ComponentFixture<BoardItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardItemsComponent]
    });
    fixture = TestBed.createComponent(BoardItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
