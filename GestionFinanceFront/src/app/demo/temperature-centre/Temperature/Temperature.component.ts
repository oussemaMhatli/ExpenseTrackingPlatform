// angular import
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';




@Component({
  selector: 'app-Temperature',
  standalone: true,
  imports: [CommonModule, SharedModule, ],
  templateUrl: './Temperature.component.html',
  styleUrls: ['./Temperature.component.scss']
})
export default class TemperatureComponent {
  
}

