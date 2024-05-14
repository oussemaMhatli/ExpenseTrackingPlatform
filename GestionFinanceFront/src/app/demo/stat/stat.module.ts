import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatRoutingModule } from './stat-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { BarchartMonthsComponent } from './components/barchart-months/barchart-months.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { PdfComponent } from './components/pdf/pdf.component';
import { LinechartcatComponent } from './components/linechartcat/linechartcat.component';
import { LinechartcatMonthComponent } from './components/linechartcat-month/linechartcat-month.component';


@NgModule({
    declarations: [
        HomeComponent,
        BarchartMonthsComponent,
        PdfComponent,
        LinechartcatComponent,
        LinechartcatMonthComponent
    ],
    imports: [
        CommonModule,
        StatRoutingModule,
        CardComponent,
        NgApexchartsModule,
        FormsModule
    ]
})
export class StatModule { }
