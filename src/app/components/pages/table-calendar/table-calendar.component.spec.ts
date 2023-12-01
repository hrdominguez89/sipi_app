import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCalendarComponent } from './table-calendar.component';

describe('TableCalendarComponent', () => {
  let component: TableCalendarComponent;
  let fixture: ComponentFixture<TableCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCalendarComponent]
    });
    fixture = TestBed.createComponent(TableCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
