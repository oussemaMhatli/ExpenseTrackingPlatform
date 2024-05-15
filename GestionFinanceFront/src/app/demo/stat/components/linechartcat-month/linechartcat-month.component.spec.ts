import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartcatMonthComponent } from './linechartcat-month.component';

describe('LinechartcatMonthComponent', () => {
  let component: LinechartcatMonthComponent;
  let fixture: ComponentFixture<LinechartcatMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinechartcatMonthComponent]
    });
    fixture = TestBed.createComponent(LinechartcatMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
