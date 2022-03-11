import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any = {};
  selectData: any;
  dtTrigger: Subject<any> = new Subject();
  bsModalRef!: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private invoiceService:InvoiceService,
    public toastr: ToastrService, ) { }

  ngOnInit(): void {
    this. showgrid() ;
  }

  
  add() {
    const initialState = {
      title: 'Add Invoice ',
    };
    this.bsModalRef = this.modalService.show(AddInvoiceComponent, {
      class: 'modal-lg',
      initialState,
      backdrop: 'static',
    });
    this.bsModalRef.content.onClose.subscribe((data: boolean) => {
      if (data == true) {
        this.rerender();
      }
    });
  }
  invoiceView() {
    if(this.selectData){
      const initialState = {
        title: ' Invoice View ',
        sendData: this.selectData,
      };
      this.bsModalRef = this.modalService.show(InvoiceViewComponent, {
        class: 'modal-lg',
        initialState,
        backdrop: 'static',
      });
      this.bsModalRef.content.onClose.subscribe((data: boolean) => {
        if (data == true) {
          this.rerender();
        }
      });
    }
   
  }

  delete(){
    console.log('Selected data ', this.selectData);

    var id = this.selectData.id;
    console.log('Selected data ', id);
    if(this.selectData){
        this.invoiceService.delete(id).subscribe(
          (resp:any) => {
            console.log('update ', resp);
            if (resp) {
              if(resp.success){
                this.toastr.success('', resp.message);
                this.rerender();
                
                
              }else{
                this.toastr.success('', resp.message);
                this.rerender();
              }
              
            } else {
        
            }
          },
          (err) => {
            this.toastr.warning('', "something wrong");
          },
        );
    }
  }


  update() {
    if (this.selectData) {
      const initialState = {
        title: 'Update Invoice ',
        sendData: this.selectData,
      };
      this.bsModalRef = this.modalService.show(AddInvoiceComponent, {
        class: 'modal-lg',
        initialState,
        backdrop: 'static',
      });
      this.bsModalRef.content.onClose.subscribe((data: boolean) => {
        if (data == true) {
          this.rerender();
        }
      });
    }
  }

  showgrid() {
    let that = this;
    this.dtOptions = {
      processing: true,
      
      ajax: {
      
        url: `${environment.baseUrl}${environment.demoApiUrl}/salesInvoice/list`,
        type: 'GET',

        beforeSend: function (xhr: any) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        },

        data: function (sendData: any) {
          // console.log('data Param', sendData);
          
        },
        error: function (request: any) {
          console.log('request.responseText', request.responseText);
        },
        dataSrc: function (response: any) {
          console.log('request.responseText', response);
          response.draw = response.data.draw;
          response.recordsTotal = response.data.recordsTotal;
          response.recordsFiltered = response.data.recordsFiltered;
           
          
          return response.data;
        },
      },

      order: [[0, 'asc']],
      columns: [
        {
          title: 'SL',
          render: function (
            data: any,
            type: any,
            row: any,
            meta: { row: number }
          ) {
            return '<span>' + (meta.row + 1) + '</span>';
          },
        },

        {
          title: 'Invoice Number',
          data: 'invoiceNumber',
          name: 'invoiceNumber',
        },
        {
          title: 'Invoice Date',
          data: 'invoiceDate',
          render: (data:any) => {
            return moment(new Date(data)).format("DD/MM/YYYY").toString();
          },
          name: 'invoiceDate',
        },
        {
          title: 'Customer Name',
          data: 'customerName',
          name: 'customerName',
        
        },
        {
          title: 'Total Amount',
          data: 'totalAmount',
          name: 'totalAmount',
        
        },
      
       
      ],
      responsive: true,
      select: true,
      rowCallback: (row: Node, data: any | Object) => {
        const self = this;
        $(row)
          .find('.booked-sloat')
          .click(function () {
            console.log('hello delete data', data);
            that.rerender();
          });

        $(row).bind('click', () => {
          this.selectData = data;
        
          
        });

        return row;
      },
    };
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next("");
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next("");
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
