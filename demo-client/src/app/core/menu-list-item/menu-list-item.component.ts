import {  Component, OnInit,AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { bufferToggle } from 'rxjs';
import { NavItem } from '../layouts/navigation/nav-item-model';
import { NavService } from '../layouts/navigation/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css']
})
export class MenuListItemComponent implements OnInit,AfterViewInit {
  // @Input() navItemsMenu = "navItems";

  // @Input()
  // navItems: [] = [];
  @Input() navItemss: NavItem[]=[];
  @Input() depth!: number;

  // classList: any;
  // nextElementSibling: any;

  constructor() { }

  ngOnInit() {
    this.ngAfterViewInit()
  }

    ngAfterViewInit() {
      // tslint:disable-next-line:prefer-const
      let dropdown = document.getElementsByClassName('dropdown-btn');
      // console.log(dropdown);
      let i;
      for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener('click',function (this: any)  {
        this.classList.toggle('active');
          // tslint:disable-next-line:prefer-const
          let dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
          } else {
            dropdownContent.style.display = 'block';
          }
        });
      }
   
    }  
 
 
}
