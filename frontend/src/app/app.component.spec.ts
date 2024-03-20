import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HrefComponent} from "./serverless/components/atoms/href/href.component";

describe('HrefComponent', () => {
  let component: HrefComponent;
  let fixture: ComponentFixture<HrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrefComponent ],
      imports: [ RouterTestingModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
