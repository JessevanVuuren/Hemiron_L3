import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { UserModule } from '../user/user.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SettingsModule } from '../settings/settings.module';



@NgModule({
  declarations: [
    CommonHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FontAwesomeModule,
    MenuModule,
    BadgeModule,
    TooltipModule,
    AvatarModule,
    UserModule,
    OverlayPanelModule,
    SettingsModule,
  ],
  exports: [
    CommonHeaderComponent,
  ]
})
export class CommonLayoutModule { }
