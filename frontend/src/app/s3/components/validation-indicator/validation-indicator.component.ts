import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-validation-indicator',
  templateUrl: './validation-indicator.component.html',
  styleUrls: ['./validation-indicator.component.scss']
})
export class ValidationIndicatorComponent implements OnInit {
  @Input() title!: string;
  @Input() valid!: boolean;
  @Input() disabled!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
