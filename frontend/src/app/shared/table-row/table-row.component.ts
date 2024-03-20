import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {

  @Input() checkboxes: boolean = false;
  @Input() rowEntry!: any;
  @Input() variableNames!: string[];
  @Input() actions: string[] = [];
  @Output() clickedTableCell: EventEmitter<any> = new EventEmitter();
  @Output() clickedAction: EventEmitter<any> = new EventEmitter();
  @Output() checkedRow: EventEmitter<any> = new EventEmitter();
  values: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.variableNames.forEach(variableName => {
      this.values.push(this.rowEntry[variableName]);
    });
  }

  emitTableCell(event:any, value: any, variableName: string) {
    event.stopPropagation();
    const clickedTableCell = {
      ...this.rowEntry,
      clickedVariableName: variableName,
      clickedValue: value
    };
    this.clickedTableCell.emit(clickedTableCell);
  } 

  emitAction(event:any, action:string){
    event.stopPropagation();
    const clickedAction = {
      ...this.rowEntry,
      action: action
    };
    this.clickedAction.emit(clickedAction);
  }

  emitCheckedRow(event:any){
    event.stopPropagation();
    this.checkedRow.emit(this.rowEntry)
  }

}
