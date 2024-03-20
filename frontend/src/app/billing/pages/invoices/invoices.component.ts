import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  public cols: any[] = [
    { field: 'invoiceNo', header: 'Factuur' },
    { field: 'status', header: 'Status' },
    { field: 'total', header: 'Prijs' },
    { field: 'invoiceDate', header: 'Datum' },
    { field: 'action', header: 'Acties' }
  ];

  public actions: string[] = ['Download'];

  constructor(public invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices();
  }

  search(input: string) {
    this.invoiceService.searchQuery(input);
  }

  performAction(event: { action: string; id: string }) {
    if (event.action === 'Download') {
      this.invoiceService.getInvoicePDF(event.id);
    }
  }
}
