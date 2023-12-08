import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsmembersComponent } from './boardsmembers.component';

describe('BoardsmembersComponent', () => {
  let component: BoardsmembersComponent;
  let fixture: ComponentFixture<BoardsmembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardsmembersComponent]
    });
    fixture = TestBed.createComponent(BoardsmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
