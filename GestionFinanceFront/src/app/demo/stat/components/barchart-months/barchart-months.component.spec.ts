import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartMonthsComponent } from './barchart-months.component';

describe('BarchartMonthsComponent', () => {
  let component: BarchartMonthsComponent;
  let fixture: ComponentFixture<BarchartMonthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarchartMonthsComponent]
    });
    fixture = TestBed.createComponent(BarchartMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
