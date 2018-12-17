import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociaFatturaDialogComponent } from './associa-fattura-dialog.component';

describe('AssociaFatturaDialogComponent', () => {
  let component: AssociaFatturaDialogComponent;
  let fixture: ComponentFixture<AssociaFatturaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociaFatturaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociaFatturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
