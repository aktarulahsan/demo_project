import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { debounce, Subscription, takeWhile, timer } from 'rxjs';
import { LoaderState } from '../../interface/loader-state';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  show = false;
  private subscription!: Subscription;


  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {

 
    this.subscription = this.loaderService.loaderState.pipe(
      debounce(() => timer(1000)),
      takeWhile((res) => res.show <= true),
    )
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
