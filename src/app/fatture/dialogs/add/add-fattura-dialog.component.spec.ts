import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFatturaDialogComponent } from './add-fattura-dialog.component';

describe('AddFatturaDialogComponent', () => {
  let component: AddFatturaDialogComponent;
  let fixture: ComponentFixture<AddFatturaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFatturaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFatturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
