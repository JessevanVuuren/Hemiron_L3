import { Component, OnInit } from '@angular/core';
import { ThemeService } from './settings/services/theme.service';
import { GuardsCheckEnd, GuardsCheckStart, NavigationCancel, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading = false;
  public title = 'ipsenh-frontend';

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.themeService.initializeTheme();
    this.setupLoadingAnimationForGuard();
  }

  public setupLoadingAnimationForGuard(): void {
    this.router.events.subscribe(event => {
      if (event instanceof GuardsCheckStart) this.loading = true;
      if (event instanceof GuardsCheckEnd || event instanceof NavigationCancel) this.loading = false;
    });
  }
}
