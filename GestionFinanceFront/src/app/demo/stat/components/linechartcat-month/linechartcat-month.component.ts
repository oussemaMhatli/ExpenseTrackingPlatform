import { Component, Input, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { StatService } from 'src/app/demo/services/stat.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-linechartcat-month',
  templateUrl: './linechartcat-month.component.html',
  styleUrls: ['./linechartcat-month.component.scss']
})
export class LinechartcatMonthComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>| any;
  transgrouped:any
  id:string=""
  token:any
   month!: string;

  constructor(private statService:StatService) {

  }
  ngOnInit(): void {

    this.token = localStorage.getItem("access_token");
    const decoded: any = jwtDecode(this.token);
    console.log('User ID:', decoded.id);
    this.id=decoded.id
    this.getBycat()
  }
  generatechart(){
    this.getBycat()
  }
  getBycat(): void {
    this.statService.getExpansivegroupedcatMonth(this.id,this.month).subscribe({
      next: (res: any) => {
        this.transgrouped = res;
        console.log("s3yb", this.transgrouped);

        // Extract categories and expenses from transgrouped object
        const categories = Object.keys(this.transgrouped);
        const expenses = Object.values(this.transgrouped);
         console.log(categories,"categ")
         console.log(expenses,"categ")
   this.addchart()
        // Update chart options with the extracted data
        this.chartOptions.series = [{
          name: "Expenses",
          data: expenses
        }];
        console.log("senf",this.chartOptions.xaxis.categories)
        this.chartOptions.xaxis.categories = categories;
        console.log("senf2",this.chartOptions.xaxis.categories)

        // Update chart
        this.chart.updateOptions(this.chartOptions);
      }
    });
  }
  addchart(){
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Expansive total by categories",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [

        ]
      }
    };
  }
}
