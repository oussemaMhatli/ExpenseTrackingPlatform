import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartcatComponent } from './linechartcat.component';

describe('LinechartcatComponent', () => {
  let component: LinechartcatComponent;
  let fixture: ComponentFixture<LinechartcatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinechartcatComponent]
    });
    fixture = TestBed.createComponent(LinechartcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
