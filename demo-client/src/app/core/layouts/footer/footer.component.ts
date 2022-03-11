import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  devby:any;
  company:any;
  constructor() { }

  ngOnInit(): void {


    // ©2021 Ayatsoft Limited, All Rights Reserved
    this.company= "©"+"20"+"22 "+"demo.Limited, A"+"ll"+"Rig"+"hts "+"Res"+"erv"+"ed"+""+""+""+""+""+""+""; 
    this.devby= "Developed By :  "+"Aktarul  Ahsan"; 
  }

}
