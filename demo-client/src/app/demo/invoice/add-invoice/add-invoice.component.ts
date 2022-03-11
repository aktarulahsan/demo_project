import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { InvoiceDetails } from '../../model/InvoiceDetails.Model';
import { InvoiceMaster } from '../../model/invoiceMaster.Model';
import { Product } from '../../model/product.Model';
import { ProductService } from '../../product/product.service';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  onClose!: Subject<boolean>;
  title: any;
  product: Product = new Product();
  sendData?: any;
  id = 0;
  isupdate = null;
  grandTotal: any = 0.00;
  tempEdit: any;
  qty: any;
  productList: Product[] = [];
  invoiceDetailsList: InvoiceDetails[] = [];
  invoiceDetails: InvoiceDetails = new InvoiceDetails();
  invoiceMaster: InvoiceMaster = new InvoiceMaster();

  invoiceDate: string = moment(new Date()).format("DD/MM/YYYY").toString();

  selectedInvoiceId:any;
  constructor(
    public bsModalRef: BsModalRef,
    public toastr: ToastrService,
    private productService: ProductService,
    private invoiceService : InvoiceService,
  ) { }


  ngOnInit(): void {
    this.onClose = new Subject();
    this.getProdoneList();
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

  getProdoneList() {
    this.productService.getproductList().subscribe((data) => {

      this.productList = data['data'];
    })
  }

  selectProduct(getProduct: any) {
    console.log('data list', getProduct);
    if (getProduct != null) {
      this.product.id = getProduct.id;
      this.product.productCode = getProduct.productCode;
      this.product.productName = getProduct.productName;
      this.product.sellingPrice = getProduct.sellingPrice;



      this.invoiceDetails.productName = getProduct.productName;
      this.invoiceDetails.productId = getProduct.id;

    }
  }

  onSaveOrUpdate(form: NgForm) {
    this.addInvoice(form);

  }

  addInvoice(form: NgForm) {
    //this.model.rate;
    if (this.product.id != null) {
      console.log("add invoice 81", this.product.id);
      if (this.product.sellingPrice! > 0) {
        const model: InvoiceDetails = new InvoiceDetails();
        if (this.isupdate != null) {
          this.update(this.tempEdit, model)
        } else {
          console.log("add invoice 85", this.invoiceDetailsList.length);
          for (let i = 0; i < this.invoiceDetailsList.length; i++) {
            if (this.invoiceDetailsList[i].productId == this.product.id) {
              this.toastr.warning('Duplicate Item can not be added');
              return;
            }

          }
          this.id += 1;
          model.id = this.id;
          // model.invoiceNumber = this.invoiceMaster.id
          model.productId = this.product.id;
          model.quantity = this.product.quantity;
          model.unitPrice = this.product.sellingPrice;
          model.amount = this.product.quantity! * this.product.sellingPrice!;
          model.productName = this.product.productName;
          // this.InvoiceModel.ssCreator = this.token.getUsername();
          console.log("total 102", this.product.quantity! * this.product.sellingPrice!);

          this.invoiceDetailsList.push(model);

          this.getGrandTotal();

          this.reset();

        }


      } else {
        this.toastr.warning(' salse rate is not valid');
      }
    }
    else { }

  }

  editData(entity: any, s: any) {
    console.log("total", entity);
    this.product.id = entity.productId;
    // this.product.productCode= entity.productCode;
    this.product.quantity = entity.quantity;
    this.product.productName = entity.productName;
    this.product.sellingPrice = entity.unitPrice;
    // model.mobile = entity.mobile;

    this.tempEdit = this.product;
    this.isupdate = entity;
  }

  update(models: any, entity: any) {
    console.log("entity", entity);
    console.log("models", models);
    // console.log("model",this.model);
    for (let i = 0; i < this.invoiceDetailsList.length; ++i) {
      if (this.invoiceDetailsList[i].productId == models.id) {
        //  this.invoiceDetailsList[i].productId = models.productId;
        this.invoiceDetailsList[i].quantity = models.quantity;
        this.invoiceDetailsList[i].productName = models.productName;
        this.invoiceDetailsList[i].unitPrice = models.sellingPrice;
        //  this.invoiceDetailsList[i].ssModifier = this.token.getUsername();

      }
    }
    this.getGrandTotal();
    this.reset();
    this.isupdate = null;
  }

  deleteitem(id: any) {
    for (let i = 0; i < this.invoiceDetailsList.length; i++) {
      if (i == id) {
        this.invoiceDetailsList.splice(i, 1);
        this.getGrandTotal();
        return;
      }

    }
  }

  getGrandTotal(): any {
    this.grandTotal = 0;
    console.log("addInvoice", this.invoiceDetailsList);
    this.invoiceDetailsList.forEach(element => {
      this.grandTotal += element.quantity! * element.unitPrice!;
      //this.getVatamount();
    });

  }
  reset() {
    this.product = new Product();
   
  }



  
  submitInvoice():any{
    if(this.invoiceMaster.id !=null){
      // if(this.selectedInvoiceId == this.invoiceMaster.id){
        this.updateInvoice();
      // }

    }else{
      this.saveInvoice();
    }
  }

  saveInvoice():any{
      
    console.log('invoiceMaster list', this.invoiceMaster);
    // if(this.invoiceMaster.orderId !=null){
      this.invoiceMaster.detailsList = this.invoiceDetailsList;
      this.invoiceMaster.totalAmount = this.grandTotal;
      console.log('invoiceDetailsList', this.invoiceDetailsList);
      console.log('invoiceDetailsList', this.invoiceMaster.detailsList);

      if(this.invoiceMaster.detailsList.length!=0 && this.invoiceMaster.customerName!=null){

        console.log('invoiceDetailsList', this.invoiceMaster.detailsList.length);
        for (let i = 0; i < this.invoiceMaster.detailsList.length; i++) {
          console.log('i_value', i);
          this.invoiceMaster.detailsList[i].id = this.invoiceMaster.id;     
        }
        console.log('create ', this.invoiceMaster);
        this.invoiceService.save(this.invoiceMaster).subscribe(
          (resp:any) => {
            console.log('create ', resp);
            if (resp) {
              if(resp.success){
                this.bsModalRef.hide();
                this.toastr.success('', resp.message);
                this.onClose.next(true);
                
                
              }else{
                this.toastr.success('', resp.message);
              }
              
            } else {
        
            }
          },
          (err) => {
            this.toastr.warning('', "something wrong");
          },
        );
      }else{
      this.toastr.warning('some field are empty');
      return;
    }
  }
  updateInvoice():any{
      
    console.log('invoiceMaster list', this.invoiceMaster);
    if(this.invoiceMaster.id !=null){
      this.invoiceMaster.detailsList = this.invoiceDetailsList;
      this.invoiceMaster.totalAmount = this.grandTotal;
    

      if(this.invoiceMaster.detailsList.length!=0 && this.invoiceMaster.customerName!=null){

        console.log('invoiceDetailsList', this.invoiceMaster.detailsList.length);
        for (let i = 0; i < this.invoiceMaster.detailsList.length; i++) {
          console.log('i_value', i);
          this.invoiceMaster.detailsList[i].id = this.invoiceMaster.id;     
        }
        console.log('update ', this.invoiceMaster);
        this.invoiceService.update(this.invoiceMaster).subscribe(
          (resp:any) => {
            console.log('update ', resp);
            if (resp) {
              if(resp.success){
                this.bsModalRef.hide();
                this.toastr.success('', resp.message);
                this.onClose.next(true);
                
                
              }else{
                this.toastr.success('', resp.message);
              }
              
            } else {
        
            }
          },
          (err) => {
            this.toastr.warning('', "something wrong");
          },
        );
      }else{
      this.toastr.warning('some field are empty');
      return;
    }}else{
      this.toastr.warning('', "something wrong");
    }
  }  


}
