import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() title!: string;
  @Input() symbol!: string;
  @Input() disabled!: boolean;
  @Input() type: "submit" | "button" = "button";

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();
}
