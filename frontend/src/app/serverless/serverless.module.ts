import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { DashboardLayoutComponent } from './components/templates/dashboard-layout/dashboard-layout.component';
import { ActionBarComponent } from './components/organisms/action-bar/action-bar.component';
import { TableComponent } from './components/organisms/table/table.component';
import { TableHeaderRowComponent } from './components/molecules/table-header-row/table-header-row.component';
import { TableRowComponent } from './components/molecules/table-row/table-row.component';
import { BannerComponent } from './components/molecules/banner/banner.component';
import { ActionsComponent } from './components/molecules/actions/actions.component';
import { TableHeaderCellComponent } from './components/atoms/table-header-cell/table-header-cell.component';
import { TableCellComponent } from './components/atoms/table-cell/table-cell.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { IconDirective } from './components/atoms/icon.directive';
import {ToastModule} from "primeng/toast";
import { SharedModule } from '../shared/shared.module';

import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MetricComponent } from './components/pages/metric/metric.component';
import { MetricLayoutComponent } from './components/templates/metric-layout/metric-layout.component';
import { CreateFunctionComponent } from './components/pages/create-function/create-function.component';
import { HrefComponent } from './components/atoms/href/href.component';
import { FunctionFormComponent } from './components/templates/function-form/function-form.component';
import { FormComponent } from './components/organisms/form/form.component';
import { FormFieldComponent } from './components/molecules/form-field/form-field.component';
import { FunctionService } from './services/function.service';
import { RouterModule } from '@angular/router';
import {CodeEditorComponent} from "./components/organisms/code-editor/code-editor.component";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardLayoutComponent,
    ActionBarComponent,
    TableComponent,
    TableHeaderRowComponent,
    TableRowComponent,
    BannerComponent,
    ActionsComponent,
    TableCellComponent,
    IconComponent,
    IconDirective,
    TableHeaderCellComponent,
    MetricComponent,
    MetricLayoutComponent,
    CreateFunctionComponent,
    HrefComponent,
    FunctionFormComponent,
    FormComponent,
    FormFieldComponent,
    CodeEditorComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastModule,
    HttpClientModule,
  ],
  providers: [
    FunctionService,
    DatePipe
  ]
})
export class ServerlessModule { }
