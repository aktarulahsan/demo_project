import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DemoModule } from './demo/demo.module'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,   
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
    DataTablesModule,

    HttpClientModule,
    FlexLayoutModule,
    AccordionModule.forRoot(),
    DemoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
providers: [BsModalRef];
