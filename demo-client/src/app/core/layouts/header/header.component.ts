import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  constructor(
   ) { }

  ngOnInit(): void {
    
  }


  getUserDetails() {
    
  }

  onLogout() {
  
    console.log(" logout ")
  }

  NewRequs (): void {
    // this.bsModalRef = this.modalService.show(SecurityProfileModalComponent, {class: 'modal-lg, modalWidth70'});
  }

}
