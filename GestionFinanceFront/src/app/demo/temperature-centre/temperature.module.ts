import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSiteTemperaturecomponent } from './view-site-temperature/view-site-temperature.component';
import { TemperatureRoutingModule } from './temperature-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TemperatureService } from './services/temperature.service';
import { ViewZoneTemperatureComponent } from './temperature/view-zone-temperature/view-zone-temperature.component';
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


export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  markers: ApexMarkers;
};


@NgModule({
  declarations: [ViewSiteTemperaturecomponent, ViewZoneTemperatureComponent],
  imports: [CommonModule, TemperatureRoutingModule, SharedModule, NgApexchartsModule],
  providers: [TemperatureService]
})
export class TemperatureModule {}
