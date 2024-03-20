import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCatalogPageComponent } from './service-catalog-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ServiceCatalogPageComponent', () => {
  let component: ServiceCatalogPageComponent;
  let fixture: ComponentFixture<ServiceCatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ServiceCatalogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
