import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreventivoDialogComponent } from './add-preventivo-dialog.component';

describe('AddPreventivoDialogComponent', () => {
  let component: AddPreventivoDialogComponent;
  let fixture: ComponentFixture<AddPreventivoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPreventivoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreventivoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
