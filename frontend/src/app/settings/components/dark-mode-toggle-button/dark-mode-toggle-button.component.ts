import { Component, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dark-mode-toggle-button',
  templateUrl: './dark-mode-toggle-button.component.html',
  styleUrl: './dark-mode-toggle-button.component.scss'
})
export class DarkModeToggleButtonComponent {
  public darkMode = false;

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const currentTheme = this.themeService.getCurrentTheme();
      this.darkMode = currentTheme === this.themeService.defaultDarkModeTheme;

      this.cdr.detectChanges();
    });
  }

  public changeTheme(): void {
    this.darkMode = !this.darkMode;
    let theme = this.themeService.defaultLightModeTheme;
    if (this.darkMode) theme = this.themeService.defaultDarkModeTheme;
    this.themeService.switchTheme(theme);
  }
}
