import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoModule } from '../demo/demo.module';


import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';


const routes: Routes = [

   
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  {
    path: 'demo',
  
    component: HomeLayoutComponent,
    loadChildren:() => DemoModule
  },
  
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
