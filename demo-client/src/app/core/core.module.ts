import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoaderComponent } from './layouts/loader/loader.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationComponent } from './layouts/navigation/navigation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
// import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    DashboardLayoutComponent,
    HomeLayoutComponent,
    NavigationComponent,
    MenuListItemComponent,
   
 
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
     
  ], 
  exports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [ 
              
  ],
})
export class CoreModule { }
