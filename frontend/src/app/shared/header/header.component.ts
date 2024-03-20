import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {animate, state, style, transition, trigger, AnimationEvent} from "@angular/animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClosed', [
      state('open', style({
        height: '100%'
      })),
      state('closed', style({
        height: '0'
      })),
      transition('closed => open', [
        animate('600ms')
      ]),
      transition('open => closed', [
        animate('300ms')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public menuOpen: boolean = false;
  @ViewChild("mobileMenu") mobileMenu!: ElementRef;

  constructor(private router: Router) { }

  public async ngOnInit() {
    this.subscribeToRouter();
  }

  private subscribeToRouter() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.toggleMenu(false)
      }
    });
  }

  public captureMenuEvent(event: AnimationEvent): void {
    if (event.toState === 'closed' && event.phaseName === 'done') {
      this.mobileMenu.nativeElement.classList.add('hidden')
    } else {
      this.mobileMenu.nativeElement.classList.remove('hidden')
    }
  }

  public toggleMenu(newValue: boolean = !this.menuOpen): void {
    this.menuOpen = newValue
  }

  // onLogin() {
  //   this.auth.login();
  // }

  // onLogout() {
  //   this.auth.logout();
  // }

  // getAuthenticated() {
  //   return this.auth.getAuthenticated();
  // }
}
