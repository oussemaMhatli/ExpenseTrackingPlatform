// angular import
import { Component, ViewChild,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';


// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DashbaordService } from './dashbaord.service';
import { AlertsService } from '../services/alerts.service';





@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [CommonModule, SharedModule,],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss'],
  providers: [DashbaordService]
})
export default class DashAnalyticsComponent implements OnInit {
  alerts:any[]=[];
  constructor(private dashboardService: DashbaordService, private router: Router,private alertservice:AlertsService) {}

temperatureAnalyticsData:any
  ngOnInit(): void {
    // Initialization logic here, such as fetching initial data from the service
    this.loadTemperatureData();
    this.getAll();

  }

  getAll(){
    this.alertservice.getAlerts().subscribe(res=>{
      this.alerts=res;
    })
  }

  loadTemperatureData(): void {
    // Example of using the DataService to load data
    this.dashboardService.getTemperatureAnalytics().subscribe((data) => {
      if(data){
      this.temperatureAnalyticsData=data

      }
      // Handle the loaded data
    });
  }


  redirectToTemperature(): void {
    this.router.navigate(['/temperature']);
  }
  redirectToAlerts(): void {
    this.router.navigate(['/alerts']);
  }
  viewMsc(mscName:string){
this.router.navigate(['/temperature/view-msc/'+ mscName])
  }

  viewZone(roomName:string) {
    this.router.navigate(['/temperature/view-zone/'+ roomName])
  }


}
