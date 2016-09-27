import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Forecast } from './../models/forecast';
import { config } from './../app.config';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ForecastService {
  private url = 'http://192.168.57.1:8081/api/';  // URL to web api

  constructor(private http: Http, private config: config) {
    this.url = config.getApiUrl();
  }
  public getForecast(mountainId: number, height?: number): Promise<Forecast[]> {
    let url = this.url+'getForecast?mountainId='+mountainId;
    if(height) {
      url = url + '&height='+height;
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Forecast[])
      .catch(this.handleError);
  }
  public getSimpleForecast(mountainId: number): Promise<Forecast[]> {
    return this.http.get(this.url+'getSimpleForecast?mountainId='+mountainId)
      .toPromise()
      .then(response => response.json().data as Forecast[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
