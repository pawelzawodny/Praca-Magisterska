import { Directive, ElementRef, HostListener, Input, Renderer, Component } from '@angular/core';

import { MountainService } from './../services/mountain.service';
import { ForecastService } from './../services/forecast.service';
import { Mountain } from './../models/mountain';
import { Forecast } from './../models/forecast';


@Component({
  selector: 'simpleForecast',
  inputs: ['mountainId'],
  template: `
    <div class="col-md-12">{{ forecast.height }}m</div>
    <div class="col-md-6 weather-icon"><i [ngClass]="getSummaryIcon()"></i></div>
    <div class="col-md-6 text-center mountain-h-temp">{{ forecast.maxTemp }}&#8451;</div>
  `,
  providers: [MountainService, ForecastService]
})
export class SimpleForecastComponent {

  public mountainId: number;

  mountains: Mountain[];
  forecasts: Forecast[];
  forecast: Forecast;
  constructor(private mountainService: MountainService, private forecastService: ForecastService) { }
  getForecast() {
    this.forecastService.getSimpleForecast(this.mountainId).then(forecast => this.forecasts = forecast).then(() => {
      this.forecast = this.forecasts[0]
    });
  }
  getSummaryIcon() {

    var isClear = false;
    var isCloudy = false;
    var isRainy = false;
    var isSnow = false;
    var isStorm = false;
    if(this.forecast.summary == 'clear') isClear = true;
    if(this.forecast.summary == 'cloudy') isCloudy = true;
    if(this.forecast.summary == 'some clouds') isCloudy = true;
    if(this.forecast.summary == 'heavy rain') isRainy = true;
    if(this.forecast.summary == 'light rain') isRainy = true;
    if(this.forecast.summary == 'light rain') isRainy = true;
    if(this.forecast.summary == 'mod. rain') isRainy = true;
    if(this.forecast.summary == 'light snow') isSnow = true;
    if(this.forecast.summary == 'light snow') isSnow = true;
    if(this.forecast.summary == 'mod. snow') isSnow = true;
    if(this.forecast.summary == 'heavy snow') isSnow = true;
    if(this.forecast.summary == 'rain shwrs') isRainy = true;
    if(this.forecast.summary == 'rain shwrs') isRainy = true;
    if(this.forecast.summary == 'risk tstorm') isStorm = true;

    return {
      wi: true,
      "wi-day-sunny": isClear,
      "wi-day-cloudy": isCloudy,
      "wi-day-rain": isRainy,
      "wi-day-snow": isSnow,
      "wi-day-sleet-storm": isStorm,
    }
  }
  ngOnInit(): void {

    this.forecast = new Forecast();
    this.getForecast();

  }

}
