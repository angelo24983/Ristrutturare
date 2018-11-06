import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreventivoDialogComponent } from './edit-preventivo-dialog.component';

describe('EditPreventivoDialogComponent', () => {
  let component: EditPreventivoDialogComponent;
  let fixture: ComponentFixture<EditPreventivoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPreventivoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreventivoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
