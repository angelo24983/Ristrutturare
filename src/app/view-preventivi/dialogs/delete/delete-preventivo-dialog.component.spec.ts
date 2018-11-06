import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePreventivoDialogComponent } from './delete-preventivo-dialog.component';

describe('DeletePreventivoDialogComponent', () => {
  let component: DeletePreventivoDialogComponent;
  let fixture: ComponentFixture<DeletePreventivoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePreventivoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePreventivoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
