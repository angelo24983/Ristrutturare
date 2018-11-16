import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPreventivoDialogComponent } from './details-preventivo-dialog.component';

describe('DetailsFatturaDialogComponent', () => {
  let component: DetailsPreventivoDialogComponent;
  let fixture: ComponentFixture<DetailsPreventivoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPreventivoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPreventivoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
