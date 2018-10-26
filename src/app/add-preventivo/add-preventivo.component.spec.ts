import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreventivoComponent } from './add-preventivo.component';

describe('AddPreventivoComponent', () => {
  let component: AddPreventivoComponent;
  let fixture: ComponentFixture<AddPreventivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPreventivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
