import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Product } from '../../model/product.Model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  onClose!: Subject<boolean>;
  title: any;
  product: Product = new Product();
  sendData?: any;
 
   
  constructor(
    public bsModalRef: BsModalRef,
    public toastr: ToastrService,
    private apiService: ProductService,
  ) { }
  ngOnInit(): void {
    this.onClose = new Subject();
    if (this.sendData) {
      console.log(this.sendData);
      this.product = this.sendData;
    }
  }

  onSaveOrUpdate(form: NgForm) {
    if (this.product.id) {
      console.log("UPDATE",form);
      this.update(form);
    } else {
      console.log("CREATE",form);
      this.create(form);
    }
    
  }

  create(form: NgForm): void {
    console.log(this.product); // print room obj
     
    this.apiService.save(this.product).subscribe(
      (resp) => {
        console.log('create ', resp);
        if (resp) {
          this.bsModalRef.hide();
          form.resetForm();
          this.toastr.success('', 'Create Successfull');
          this.onClose.next(true);
        } else {
          
        }
      },
      (err) => {
        this.toastr.warning('', 'Error occured');
      }
    );
  }

  update(form: NgForm): void {
    
  
    this.apiService.update(this.product).subscribe(
      (resp) => {
        console.log('update ', resp);
        if (resp) {
          this.bsModalRef.hide();
          form.resetForm();
          this.toastr.success('', 'Update Successfull');
          this.onClose.next(true);
        } else {
          // this.toastr.success('', resp);
        }
      },
      (err) => {
        this.toastr.warning('', 'Error occured');
      }
    );
  }



}
