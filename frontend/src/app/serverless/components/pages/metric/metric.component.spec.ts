import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from "../../../../project/services/project.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MetricComponent } from './metric.component';
import { FunctionService } from "../../../services/function.service";
import { DatePipe } from "@angular/common";
import { of } from 'rxjs';

const activatedRouteStub = {
  snapshot: {
    paramMap: {
      get: () => 'test_id',
    },
  },
  params: of({ id: 'test_id' })
};

const functionServiceStub = {
  get: jasmine.createSpy('get').and.returnValue(of("test")),
  delete: jasmine.createSpy('delete').and.returnValue(of("test")),
};

const projectServiceStub = {
  get: jasmine.createSpy('get').and.returnValue(of("1234")),
};

describe('MetricComponent', () => {
  let component: MetricComponent;
  let fixture: ComponentFixture<MetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [MetricComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: FunctionService, useValue: functionServiceStub },
        { provide: ProjectService, useValue: projectServiceStub },
        DatePipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
