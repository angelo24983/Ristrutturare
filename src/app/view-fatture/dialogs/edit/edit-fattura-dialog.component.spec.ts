import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFatturaDialogComponent } from './edit-fattura-dialog.component';

describe('EditFatturaDialogComponent', () => {
  let component: EditFatturaDialogComponent;
  let fixture: ComponentFixture<EditFatturaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFatturaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFatturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
