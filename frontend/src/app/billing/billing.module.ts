import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {LandingComponent} from './pages/landing/landing.component';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {RouterModule} from '@angular/router';
import {ChartModule} from 'primeng/chart';
import {ChartComponent} from "./components/chart/chart.component";
import {ProductsComponent} from "./pages/products/products.component";
import {ProductItemComponent} from "./components/product-list/product-item/product-item.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {NgChartsModule} from "ng2-charts";
import { TableModule } from 'primeng/table';
import {TabViewModule} from "primeng/tabview";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LandingComponent,
    InvoicesComponent,
    DashboardComponent,
    ChartComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductListComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        CanvasJSAngularChartsModule,
        ChartModule,
        InputTextModule,
        InputNumberModule,
        NgChartsModule,
        TabViewModule,
        DropdownModule,
        FormsModule,
        TableModule
    ]
})
export class BillingModule { }
