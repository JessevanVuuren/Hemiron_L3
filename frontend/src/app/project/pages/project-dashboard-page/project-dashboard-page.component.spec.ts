import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDashboardPageComponent } from './project-dashboard-page.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProjectDashboardPageComponent', () => {
  let component: ProjectDashboardPageComponent;
  let fixture: ComponentFixture<ProjectDashboardPageComponent>;

  const activatedRouteStub = {
    params: of({ id: 'testId' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDashboardPageComponent],
      imports: [
        TabMenuModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

