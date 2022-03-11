import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { InvoiceDetails } from '../../model/InvoiceDetails.Model';
import { InvoiceMaster } from '../../model/invoiceMaster.Model';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {

  onClose!: Subject<boolean>;
  title: any;
  sendData?: any;
  invoiceDetailsList: InvoiceDetails[] = [];
  invoiceMaster: InvoiceMaster = new InvoiceMaster();
  grandTotal:any= 0.0;
  constructor(
    public bsModalRef: BsModalRef,
    private invoiceService : InvoiceService,
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    if (this.sendData) {
      console.log(this.sendData);
      this.invoiceMaster = this.sendData;
      this.grandTotal = this.invoiceMaster.totalAmount;
      
      this.getDetailsList(this.invoiceMaster.id);
    }
  }


  getDetailsList(id:any) {
    var details = new InvoiceDetails();
    details.invoiceNumber = id;
    this.invoiceService.getInvoiceDetailsList(details).subscribe((data) => {

      this.invoiceDetailsList = data['data'];
    })
  }
}
