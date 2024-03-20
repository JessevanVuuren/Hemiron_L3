import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBucketComponent } from './add-bucket.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddBucketComponent', () => {
  let component: AddBucketComponent;
  let fixture: ComponentFixture<AddBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AddBucketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
