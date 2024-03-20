import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table-header-row',
  templateUrl: './table-header-row.component.html',
  styleUrls: ['./table-header-row.component.scss']
})
export class TableHeaderRowComponent implements AfterViewInit {
  @ViewChild('lastColumn') lastColumn!: ElementRef;

  ngAfterViewInit(): void {
    this.adjustColumnWidth();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.adjustColumnWidth();
  }

  adjustColumnWidth() {
    const typedLastColumn = this.lastColumn.nativeElement as HTMLElement;
    const tableWidth = typedLastColumn.parentElement?.parentElement?.offsetWidth;
    const innerWidth = window.innerWidth;
    if (tableWidth != null)
      typedLastColumn.style.right = tableWidth - innerWidth + 'px';
  }
}
