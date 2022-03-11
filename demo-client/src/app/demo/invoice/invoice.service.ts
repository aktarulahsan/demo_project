import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvoiceMaster } from '../model/invoiceMaster.Model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
) { }

private END_POINT = `salesInvoice`; 
private END_POINT_DETAILS = `salesInvoiceDetails`; 
private SAVE= `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/create`;
private UPDATE = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/update`;
private  LIST = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/list`;
private  DELETE = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/delete`;
private FIND_BY_ID = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT}/findById`;

private  DETAILS_LIST = `${environment.baseUrl}${environment.demoApiUrl}/${this.END_POINT_DETAILS}/list`;

getInvoiceList(): Observable<any> {
  return this.http.get(`${this.LIST}`);
}

save(data: InvoiceMaster): Observable<InvoiceMaster> {
  return this.http
    .post<InvoiceMaster>(this.SAVE, data)
    .pipe(map((data: InvoiceMaster) => data));
}


update(data: InvoiceMaster): Observable<InvoiceMaster> {
  return this.http
    .put<InvoiceMaster>(this.UPDATE, data)
    .pipe(map((data: InvoiceMaster) => data));
}

delete(id:any) {
  return this.http.delete<any>(this.DELETE, {
    params: new HttpParams().set('id', id)
  });
}


getInvoiceDetailsList(data:any): Observable<any> {
  return this.http
  .post<InvoiceMaster>(this.DETAILS_LIST, data)
  .pipe(map((data: InvoiceMaster) => data));
}

}
