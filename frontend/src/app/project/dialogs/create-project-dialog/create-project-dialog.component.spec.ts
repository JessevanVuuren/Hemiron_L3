import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectDialogComponent } from './create-project-dialog.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

describe('CreateProjectDialogComponent', () => {
  let component: CreateProjectDialogComponent;
  let fixture: ComponentFixture<CreateProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreateProjectDialogComponent],
        providers: [
            { provide: DynamicDialogRef, useValue: {} },
            { provide: DynamicDialogConfig, useValue: {} }
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
