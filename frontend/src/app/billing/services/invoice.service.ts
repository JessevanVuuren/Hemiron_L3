import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { ProjectService } from '../../project/services/project.service';
import { Invoice } from "../../shared/models/invoice.model";
import { InvoicePdf } from "../../shared/models/invoice-pdf.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public invoices: Invoice[] = [];
  public filteredInvoices: Invoice[] = [];
  public filtered: boolean = false;
  public projectId: string | undefined = this.projectService.currentProject?.id;

  constructor(private httpService: HttpService, private projectService: ProjectService) { }

  async getInvoices() {
    this.httpService.get<Invoice[]>('/invoices/' + this.projectId).subscribe(
      (response: Invoice[]) => {
        this.invoices = this.formatInvoices(response);
      }
    );
  }

  public getInvoicePDF(invoiceId: string) {
    this.httpService.get<InvoicePdf>('/invoices/' + this.projectId + "/" + invoiceId + "/pdf").subscribe((response: InvoicePdf) => {
      const downloadLink = document.createElement("a");

      const fileName = response.fileName;
      const linkSource = `data:application/pdf;base64,${response.invoicePDF}`;

      downloadLink.download = fileName;
      downloadLink.href = linkSource;

      downloadLink.click();
    })
  }

  public searchQuery(input: string): void {
    if (input === "") {
      this.filtered = false;
      return;
    }

    this.filteredInvoices = this.invoices.filter((invoice: Invoice) =>
      Object.values(invoice).some((value: any) =>
        value.toString().includes(input)
      )
    );

    this.filtered = true;
  }

  formatInvoices(invoices: any[]): any[] {
    return invoices.map(invoice => ({
      ...invoice,
      invoiceDate: invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '',
      total: invoice.total ? `€${invoice.total}` : '€0'
    }));
  }


}
