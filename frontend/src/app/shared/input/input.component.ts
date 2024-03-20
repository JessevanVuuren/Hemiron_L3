import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Output() inputEmitter: EventEmitter<any> = new EventEmitter();

  public input: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  emitInput(){
    this.inputEmitter.emit(this.input);
    
  }

}
