import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-not-loaded-page',
  templateUrl: './profile-not-loaded-page.component.html',
  styleUrl: './profile-not-loaded-page.component.scss'
})
export class ProfileNotLoadedPageComponent {

  public reloadPage(): void {
    window.location.reload();
  }
}
