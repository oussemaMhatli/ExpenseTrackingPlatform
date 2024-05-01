// angular import
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexMarkers
} from 'ng-apexcharts';


@Component({
  selector: 'app-remote',
  standalone: true,
  imports: [CommonModule, SharedModule,  ],
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss']
})
export default class RemoteComponent {
 
}
