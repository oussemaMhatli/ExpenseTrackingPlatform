/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
// Angular Import
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WebSocketService } from './demo/services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // constructor
  constructor(private router: Router,private socketService:WebSocketService) {}

  // life cycle event
  ngOnInit() {
    /*this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.socketService.onTemperatureData().subscribe((data: any) => {
      console.log('New temperature data:', data);
      // Handle the new temperature data here
    });  */

  }
}
