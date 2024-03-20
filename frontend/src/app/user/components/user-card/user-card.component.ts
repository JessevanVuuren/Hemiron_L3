import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnChanges {
  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;
  @Input() email: string | undefined;
  public initials = "";

  ngOnChanges(): void {
    if (this.firstName && this.lastName)
      this.initials = this.firstName.charAt(0) + this.lastName.charAt(0);
  }
}
