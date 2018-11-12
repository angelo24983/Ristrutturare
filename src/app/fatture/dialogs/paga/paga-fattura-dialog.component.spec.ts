import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagaFatturaDialogComponent } from './paga-fattura-dialog.component';

describe('PagaFatturaDialogComponent', () => {
  let component: PagaFatturaDialogComponent;
  let fixture: ComponentFixture<PagaFatturaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagaFatturaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagaFatturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
