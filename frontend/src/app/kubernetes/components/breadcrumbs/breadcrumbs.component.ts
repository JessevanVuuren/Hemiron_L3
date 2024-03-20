import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {

  items: MenuItem[];
  
  constructor(private router: Router) {
    // Get current URL
    const currentUrl = this.router.url;

    // Split the URL into segments
    const segments = currentUrl.split('/');

    // Remove the first empty segment and the first item
    segments.shift();

    // Create breadcrumb items
    this.items = segments.map((segment, index) => {
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      const routerLink = '/' + segments.slice(0, index + 1).join('/');
      return { label, routerLink };
    });
  }

  



}
