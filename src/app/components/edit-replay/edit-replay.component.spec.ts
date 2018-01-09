import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReplayComponent } from './edit-replay.component';

describe('EditReplayComponent', () => {
  let component: EditReplayComponent;
  let fixture: ComponentFixture<EditReplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
