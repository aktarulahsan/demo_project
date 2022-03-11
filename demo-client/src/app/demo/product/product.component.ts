import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddProductComponent } from './add-product/add-product.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any = {};
  selectData: any;
  dtTrigger: Subject<any> = new Subject();
  bsModalRef!: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this. showgrid() ;
  }

  
  add() {
    const initialState = {
      title: 'Add Product ',
    };
    this.bsModalRef = this.modalService.show(AddProductComponent, {
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


  update() {
    if (this.selectData) {
      const initialState = {
        title: 'Update Product ',
        sendData: this.selectData,
      };
      this.bsModalRef = this.modalService.show(AddProductComponent, {
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
      
        url: `${environment.baseUrl}${environment.demoApiUrl}/product/list`,
        type: 'GET',

        beforeSend: function (xhr: any) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        },

        data: function (sendData: any) {
          // console.log('data Param', sendData);
          // sendData.floorNo = that.selectedFloor.id
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
          title: 'productCode',
          data: 'productCode',
          name: 'productCode',
        },
        {
          title: 'productName',
          data: 'productName',
          name: 'productName',
        },
        {
          title: 'sellingPrice',
          data: 'sellingPrice',
          name: 'sellingPrice',
        
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
        
          console.log('Selected User ', this.selectData);
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
