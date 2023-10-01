import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'raspadita';
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;
  constructor(
    private router: Router) {

  }


  ngOnInit(): void {
    this.checkNetworkStatus();
  }
  ngAfterViewInit(): void {
    // this.RegistroEmpresa();
  }
  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }
  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        console.log('status', status);
        this.networkStatus = status;
      });
  }


}
