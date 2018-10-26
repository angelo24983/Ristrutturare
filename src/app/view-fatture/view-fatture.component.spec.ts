
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFattureComponent } from './view-fatture.component';

describe('ViewFattureComponent', () => {
  let component: ViewFattureComponent;
  let fixture: ComponentFixture<ViewFattureComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFattureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFattureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
