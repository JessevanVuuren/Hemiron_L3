import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AvatarModule } from 'primeng/avatar';



@NgModule({
  declarations: [
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
  ],
  exports: [
    UserCardComponent,
  ]
})
export class UserModule { }
