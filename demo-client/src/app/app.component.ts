import { Component } from '@angular/core';
import { Event as NavigationEvent, NavigationStart } from "@angular/router";
import { Router } from "@angular/router";
import { filter, take, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-web';



  constructor(private router: Router) {
 
  }
}
