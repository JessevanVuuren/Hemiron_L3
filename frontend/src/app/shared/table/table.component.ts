import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  //headers and variableNames should be in order from left to right.

  constructor() { }
  @Input() checkboxes: boolean = false
  @Input() headers!: string[];
  @Input() rowEntries!: object[];
  @Input() variableNames!: string[];
  @Input() actions: string[] = [];
  @Output() clickedRowEmitter: EventEmitter<any> = new EventEmitter();
  @Output() clickedTableCellEmitter: EventEmitter<any> = new EventEmitter();
  @Output() clickedActionEmitter: EventEmitter<any> = new EventEmitter();
  @Output() checkedRowsEmitter: EventEmitter<any> = new EventEmitter();

  private checkedRows: any[] = [];
  
  ngOnInit(): void {

  }
  emitRow(item:any) {
    this.clickedRowEmitter.emit(item);
  } 

  emitTableCell(event: any){
    this.clickedTableCellEmitter.emit(event);
  }
  emitAction(event: any){
    this.clickedActionEmitter.emit(event);
  }

  emitCheckedRows(rowEntry: any){
    this.checkedRows.indexOf(rowEntry) === -1 ? this.checkedRows.push(rowEntry) : this.checkedRows.splice(this.checkedRows.indexOf(rowEntry), 1)
    this.checkedRowsEmitter.emit(this.checkedRows);
  }
}
