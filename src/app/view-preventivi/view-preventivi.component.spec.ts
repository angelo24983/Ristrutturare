
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPreventiviComponent } from './view-preventivi.component';

describe('ViewPreventiviComponent', () => {
  let component: ViewPreventiviComponent;
  let fixture: ComponentFixture<ViewPreventiviComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPreventiviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPreventiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
