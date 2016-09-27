import { Component } from '@angular/core';

import { MountainService } from './../services/mountain.service';
import { ForecastService } from './../services/forecast.service';
import { Mountain } from './../models/mountain';
import { Forecast } from './../models/forecast';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'singleMountain',
  templateUrl: './../views/singleMountain.html',
  providers: [MountainService, ForecastService]
})
export class SingleMountainComponent {
  mountain: Mountain;
  forecasts: Forecast[];
  forecast: Forecast;
  id: number;
  height: number;
  currentHeight: number;
  constructor(
    private mountainService: MountainService,
    private forecastService: ForecastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentHeight = 0;
  }
  getForecast() {
    if(this.currentHeight > 0) {
      this.forecastService.getForecast(this.mountain.id, this.currentHeight).then(forecast => this.forecasts = forecast).then(() => {
        this.forecast = this.forecasts.shift();
      });
    } else {
      this.forecastService.getForecast(this.mountain.id).then(forecast => this.forecasts = forecast).then(() => {
        this.forecast = this.forecasts.shift();
        this.currentHeight = this.forecast.height;
      });
    }

  }
  onSelect(height: number, id: number) {
    this.router.navigate(['/mountain', id, {height: height}]);
  }
  getSummaryIcon(summary: string) {

    var isClear = false;
    var isCloudy = false;
    var isRainy = false;
    var isSnow = false;
    var isStorm = false;
    if(summary == 'clear') isClear = true;
    if(summary == 'cloudy') isCloudy = true;
    if(summary == 'some clouds') isCloudy = true;
    if(summary == 'heavy rain') isRainy = true;
    if(summary == 'light rain') isRainy = true;
    if(summary == 'light rain') isRainy = true;
    if(summary == 'mod. rain') isRainy = true;
    if(summary == 'light snow') isSnow = true;
    if(summary == 'light snow') isSnow = true;
    if(summary == 'mod. snow') isSnow = true;
    if(summary == 'heavy snow') isSnow = true;
    if(summary == 'rain shwrs') isRainy = true;
    if(summary == 'rain shwrs') isRainy = true;
    if(summary == 'risk tstorm') isStorm = true;

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
    this.mountain = new Mountain();
    this.route.params.forEach((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.height = params['height'] ? +params['height'] : 0;

      this.mountainService.getMountain(this.id)
        .then(mountain => this.mountain = mountain)
        .then(() => {
          if(this.height > 0) {
            this.currentHeight = this.height;
          } else {

          }

          this.mountainService.getMountainHeights(this.id)
            .then(heights => this.mountain.heights = heights)
            .then(() => {
              this.getForecast();
            });

        });
    });

  }

}
