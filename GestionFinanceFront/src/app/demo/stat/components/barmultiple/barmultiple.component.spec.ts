import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarmultipleComponent } from './barmultiple.component';

describe('BarmultipleComponent', () => {
  let component: BarmultipleComponent;
  let fixture: ComponentFixture<BarmultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarmultipleComponent]
    });
    fixture = TestBed.createComponent(BarmultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
