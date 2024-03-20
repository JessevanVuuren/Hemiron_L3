import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ServiceCatalogPageComponent } from './pages/service-catalog-page/service-catalog-page.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';



@NgModule({
  declarations: [
    ServiceCatalogPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule,
    ButtonModule,
    CardModule,
    OverlayPanelModule,
  ],
})
export class ServiceModule { }
