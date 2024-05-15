import { Component, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { StatService } from 'src/app/demo/services/stat.service';
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-barchart-months',
  templateUrl: './barchart-months.component.html',
  styleUrls: ['./barchart-months.component.scss']
})
export class BarchartMonthsComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
token:any
expansebyMonth:any
  constructor(private stat:StatService) {

  }
  ngOnInit(): void {

    this.token = localStorage.getItem("access_token");
    const decoded: any = jwtDecode(this.token);
    console.log('User ID:', decoded.id);
    this.getTotlaExpansemonth(decoded.id)
  }
  getTotlaExpansemonth(id:string){
    this.stat.getExpansebymonth(id).subscribe({
      next:(res:any)=>{
       this.expansebyMonth=res
       console.log("exxx",this.expansebyMonth)
       this.chartOptions = {
        series: [
          {
            name: "Expanse",
            data: this.expansebyMonth
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function(chart:any, w:any, e:any) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#546E7A",
          "#26a69a",
          "#D10CE8"
        ],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        },
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
          labels: {
            style: {
              colors: [
                "#008FFB", // Blue
                "#00E396", // Green
                "#FEB019", // Yellow
                "#FF4560", // Red
                "#775DD0", // Purple
                "#546E7A", // Gray
                "#26a69a", // Teal
                "#D10CE8", // Pink
                "#FF6384", // Coral
                "#36A2EB", // Sky Blue
                "#4BC0C0", // Mint Green
                "#FFCE56"  // Mustard Yellow
              ],
              fontSize: "12px"
            }
          }
        }
      };
      },
      error:(error:any)=>{
         console.log(error,"getAllexpanse")
      }
    })
  }
}
