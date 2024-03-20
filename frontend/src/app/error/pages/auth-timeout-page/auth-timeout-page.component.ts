import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-timeout-page',
  templateUrl: './auth-timeout-page.component.html',
  styleUrl: './auth-timeout-page.component.scss'
})
export class AuthTimeoutPageComponent {

  public reloadPage(): void {
    window.location.reload();
  }
}
