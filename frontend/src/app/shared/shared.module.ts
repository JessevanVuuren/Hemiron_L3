import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table-row/table-row.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { DashboardTileComponent } from './dashboard-tile/dashboard-tile.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
    declarations: [
        HeaderComponent,
        TableComponent,
        TableRowComponent,
        InputComponent,
        ButtonComponent,
        DashboardTileComponent,
        ToastComponent
    ],
    exports: [
        HeaderComponent,
        TableComponent,
        InputComponent,
        ButtonComponent,
        DashboardTileComponent,
        ToastComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      BrowserAnimationsModule,
      FormsModule
    ]
})
export class SharedModule { }
