import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFattureComponent } from './show-fatture.component';

describe('ShowFattureComponent', () => {
  let component: ShowFattureComponent;
  let fixture: ComponentFixture<ShowFattureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFattureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFattureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
