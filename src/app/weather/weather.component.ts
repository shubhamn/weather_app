import { Component, inject } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-weather',
  imports: [DatePipe,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  private readonly weatherService = inject(WeatherService);

  cities = ['Birmingham', 'London', 'Cardiff'];
  selectedCity: string = '';
  forecasts: any[] = [];

  clearSelection(event: Event) {
    event.stopPropagation();
    this.selectedCity = '';
    this.onCityChange();
  }

  onCityChange() {
    if (this.selectedCity) {
      // OpenWeatherMap's 5-day forecast API returns data in 3-hour intervals (8 data points per day).
      // We use only one data point per day (every 8th index) to show a daily forecast instead of 3-hour intervals.
      this.weatherService
        .getWeather(this.selectedCity)
        .subscribe((data: any) => {
          this.forecasts = data.list.filter(
            (forecast: any, index: number) => index % 8 === 0
          );
        });
    } else {
      this.forecasts = [];
    }
  }
}
