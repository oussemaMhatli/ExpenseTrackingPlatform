import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationDepensesComponent } from './planification-depenses.component';

describe('PlanificationDepensesComponent', () => {
  let component: PlanificationDepensesComponent;
  let fixture: ComponentFixture<PlanificationDepensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificationDepensesComponent]
    });
    fixture = TestBed.createComponent(PlanificationDepensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
