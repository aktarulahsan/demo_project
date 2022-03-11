import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { EditorModule } from '@tinymce/tinymce-angular';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    NgSelectModule,
    ModalModule.forRoot(),
    EditorModule,
    
     
  ],
  exports:[
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule,
    EditorModule,
    TabsModule,
    TooltipModule,
    NgSelectModule,
    BsDatepickerModule,
    
    
  ],
  providers: [BsModalRef, CookieService]
 
})
export class SharedModule { }
