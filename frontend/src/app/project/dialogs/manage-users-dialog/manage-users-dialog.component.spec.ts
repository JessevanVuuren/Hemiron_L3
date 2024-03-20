import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageUsersDialogComponent } from './manage-users-dialog.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

describe('ManageUsersDialogComponent', () => {
  let component: ManageUsersDialogComponent;
  let fixture: ComponentFixture<ManageUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ManageUsersDialogComponent],
      providers: [
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DynamicDialogConfig, useValue: { data: { project: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
