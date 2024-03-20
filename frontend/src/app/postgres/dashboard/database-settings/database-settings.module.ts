import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatabaseSettingsRoutingModule} from './database-settings-routing.module';
import {DatabaseSettingsComponent} from './database-settings.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DatabaseSettingsComponent
  ],
  imports: [
    CommonModule,
    DatabaseSettingsRoutingModule,
    FormsModule,
  ]
})
export class DatabaseSettingsModule {
}
