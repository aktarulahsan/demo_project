import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from './nav-item-model';
// import { NavigationService } from '../../service/navigation.service';
 

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  
  @Input() navData!: [];

  newNavItems: NavItem[] = [];
  navitemtest= "coffe";

  navItems: NavItem[] = [
    {
      displayName: 'Demo', route: 'demo/dashboard', iconName: 'fas fa-user-md',
      children: [
        { displayName: 'Product', route: 'demo/product', iconName: 'far fa-circle subIcon', children: [] },
        { displayName: 'Invoice', route: 'demo/invoice', iconName: 'far fa-circle subIcon', children: [] },
        
      ]
    },


  ];


  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#close-sidebar').click(function () {
        $('.page-wrapper').removeClass('toggled');
      });
      $('#show-sidebar').click(function () {
        $('.page-wrapper').addClass('toggled');
      });

    });

    // this.getMenuList();
  }
  // getMenuList() {
  //   this.navigationService.getMenuList().subscribe(
  //     (resp: any) => {
  //       if (resp.success) {
  //         this.newNavItems = resp.items;
  //         console.log(resp);
  //       } else {
  //         console.log(resp.message);
  //       }
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   )
  // }

  processMenuTree(menuList: any[]) {
    let roots = [];
    let nodes = [];
    let dispvaal = [];
    let j = 0;

    for (let i in menuList) {
      let menu = menuList[i];
      dispvaal[j] = menu.pageLink;
      j++;
      nodes[menu.childId] = {
        // lvl: menu.LVL, 
        displayName: menu.displayValue,
        //master_mod: menu.MASTER_MOD,
        childId: menu.childId,
        route: menu.pageLink,
        iconName:menu.iconName,
        children: []
      };
      if (menu.parentId == 0) {
        roots.push(nodes[menu.childId]);
      }
      else {
        // nodes[menu.parentId].children.push(nodes[menu.childId]);
      }
    }
    this.newNavItems = roots;
    // console.log('New Nav Menu Item : ', this.newNavItems);
    // this.getLeaf(roots, "");

  }
}
