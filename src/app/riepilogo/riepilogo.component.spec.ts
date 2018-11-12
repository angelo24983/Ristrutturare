
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoComponent } from './riepilogo.component';

describe('RiepilogoComponent', () => {
  let component: RiepilogoComponent;
  let fixture: ComponentFixture<RiepilogoComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RiepilogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiepilogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
