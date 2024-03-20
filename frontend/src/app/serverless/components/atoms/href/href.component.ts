import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-href',
  templateUrl: './href.component.html',
  styleUrls: ['./href.component.scss']
})
export class HrefComponent {
  @Input() route!: string;
}
