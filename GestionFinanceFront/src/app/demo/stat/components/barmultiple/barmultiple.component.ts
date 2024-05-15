import { Component, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
import { StatService } from 'src/app/demo/services/stat.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};
@Component({
  selector: 'app-barmultiple',
  templateUrl: './barmultiple.component.html',
  styleUrls: ['./barmultiple.component.scss']
})
export class BarmultipleComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
   id:any
   token:any
  constructor(private statService:StatService) {

  }
addchart(){
  this.chartOptions = {
    series: [

    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%"
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ],
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50
    }
  };
}
  ngOnInit(): void {
    this.token = localStorage.getItem("access_token");
    const decoded: any = jwtDecode(this.token);
    console.log('User ID:', decoded.id);
    this.id=decoded.id
    this.expensebyyearcateg()

  }
  expensebyyearcateg(){
    this.statService.expensebyyearcat(this.id).subscribe({
      next:(res:any)=>{
        console.log("naaaaaaaaaaaaaa",res)
        this.addchart()
        this.chartOptions.series=res
      }

    })
  }
}
