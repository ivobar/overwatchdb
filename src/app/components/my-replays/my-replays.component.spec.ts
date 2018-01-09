import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReplaysComponent } from './my-replays.component';

describe('MyReplaysComponent', () => {
  let component: MyReplaysComponent;
  let fixture: ComponentFixture<MyReplaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReplaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
