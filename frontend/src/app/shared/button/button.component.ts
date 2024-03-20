import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() title!: string;
  @Input() symbol!: string;
  @Input() disabled!: boolean;
  @Input() type: "submit" | "button" = "button";

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
