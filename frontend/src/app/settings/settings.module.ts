import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeToggleButtonComponent } from './components/dark-mode-toggle-button/dark-mode-toggle-button.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    DarkModeToggleButtonComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
  ],
  exports: [
    DarkModeToggleButtonComponent,
  ]
})
export class SettingsModule { }
