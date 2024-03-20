import { Component, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { IconDirective } from '../../atoms/icon.directive';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  @ContentChildren(IconDirective, { read: ElementRef }) icons!: QueryList<ElementRef>;

  hasIcon(): boolean {
    return this.icons && this.icons.length > 0;
  }
}
