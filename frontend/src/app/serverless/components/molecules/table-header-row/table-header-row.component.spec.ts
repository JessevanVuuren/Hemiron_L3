import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderRowComponent } from './table-header-row.component';

describe('TableHeaderRowComponent', () => {
  let component: TableHeaderRowComponent;
  let fixture: ComponentFixture<TableHeaderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHeaderRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
