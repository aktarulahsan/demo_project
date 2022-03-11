import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product.Model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(
      private http: HttpClient
  ) { }

  private END_POINT = `product`; 
  private SAVE= `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/create`;
  private UPDATE = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/update`;
  private  LIST = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/list`;
  private FIND_BY_ID = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/findById`;
  
  
  getproductList(): Observable<any> {
    return this.http.get(`${this.LIST}`);
  }
 
  save(data: Product): Observable<Product> {
    return this.http
      .post<Product>(this.SAVE, data)
      .pipe(map((data: Product) => data));
  }

  
  update(data: Product): Observable<Product> {
    return this.http
      .put<Product>(this.UPDATE, data)
      .pipe(map((data: Product) => data));
  }


}
