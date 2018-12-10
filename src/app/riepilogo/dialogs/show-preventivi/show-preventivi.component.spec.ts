import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPreventiviComponent } from './show-preventivi.component';

describe('ShowPreventiviComponent', () => {
  let component: ShowPreventiviComponent;
  let fixture: ComponentFixture<ShowPreventiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPreventiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPreventiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
