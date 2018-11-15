import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFatturaDialogComponent } from './details-fattura-dialog.component';

describe('DetailsFatturaDialogComponent', () => {
  let component: DetailsFatturaDialogComponent;
  let fixture: ComponentFixture<DetailsFatturaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFatturaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFatturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
