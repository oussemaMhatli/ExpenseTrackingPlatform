import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatRoutingModule } from './stat-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { BarchartMonthsComponent } from './components/barchart-months/barchart-months.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
    declarations: [
        HomeComponent,
        BarchartMonthsComponent
    ],
    imports: [
        CommonModule,
        StatRoutingModule,
        CardComponent,
        NgApexchartsModule
    ]
})
export class StatModule { }
