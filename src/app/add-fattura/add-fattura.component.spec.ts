import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFatturaComponent } from './add-fattura.component';

describe('AddFatturaComponent', () => {
  let component: AddFatturaComponent;
  let fixture: ComponentFixture<AddFatturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFatturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFatturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
