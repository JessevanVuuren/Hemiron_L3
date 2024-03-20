import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = "app-theme-setting";

  public defaultLightModeTheme = "light-indigo";
  public defaultDarkModeTheme = "dark-indigo";

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public initializeTheme(): void {
    const theme = localStorage.getItem(this.storageKey);

    if (!theme) this.switchTheme(this.getDefaultThemeByDevice());
    else this.switchTheme(theme);

    // We currently only have light and dark mode, the rest of the code is made this way to make way for future theming if wanted so.
    // Because we only have a distinction between light and dark we check for this, in case the user manipulates his local storage.
    if (theme !== this.defaultLightModeTheme && theme !== this.defaultDarkModeTheme) this.switchTheme(this.getDefaultThemeByDevice());
  }

  public switchTheme(theme: string): void {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) themeLink.href = theme + ".css";
    localStorage.setItem(this.storageKey, theme);
  }

  public getCurrentTheme(): string {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    const link = themeLink.attributes.getNamedItem("href")?.value;
    if (!link) return "";
    return link.replace(".css", "");
  }

  // Checks if the user's browser is set to dark mode, and returns the correct default theme whether its light or dark.
  private getDefaultThemeByDevice(): string {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return this.defaultDarkModeTheme;
    return this.defaultLightModeTheme;
  }
}
