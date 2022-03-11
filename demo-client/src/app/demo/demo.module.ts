import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { InvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';


@NgModule({
  declarations: [
    ProductComponent,
    InvoiceComponent,
    AddProductComponent,
    AddInvoiceComponent,
    InvoiceViewComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule,
    NgSelectModule,
    DataTablesModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class DemoModule { }
