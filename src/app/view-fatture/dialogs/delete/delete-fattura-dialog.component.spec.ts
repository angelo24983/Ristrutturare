import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFatturaDialogComponent } from './delete-fattura-dialog.component';

describe('DeleteFatturaDialogComponent', () => {
  let component: DeleteFatturaDialogComponent;
  let fixture: ComponentFixture<DeleteFatturaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFatturaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFatturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
