import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjectsBrowserComponent } from './objects-browser.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfirmationService } from 'primeng/api';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ObjectsBrowserComponent', () => {
  let component: ObjectsBrowserComponent;
  let fixture: ComponentFixture<ObjectsBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ObjectsBrowserComponent],
      providers: [ConfirmationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsBrowserComponent);
    component = fixture.componentInstance;
    component.bucket = {amountOfObjects: 0, size: 0, name: 'mockBucketName'};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
