import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements AfterViewInit {
  @ViewChildren('lastColumn') lastColumns!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.adjustColumnWidth();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.adjustColumnWidth();
  }

  adjustColumnWidth() {
    const typedLastColumn = this.lastColumns.first.nativeElement as HTMLElement;
    const tableWidth = typedLastColumn.parentElement?.parentElement?.offsetWidth;
    const innerWidth = window.innerWidth;
    if (tableWidth != null)
      typedLastColumn.style.right = tableWidth - innerWidth + 'px';
  }
}
