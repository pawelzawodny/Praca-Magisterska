import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Mountain } from './../models/mountain';
import { config } from './../app.config';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class MountainService {
  private url = 'http://192.168.57.1:8081/api/';  // URL to web api

  constructor(private http: Http, private config: config) {
    this.url = config.getApiUrl();
  }
  public getMountain(id: number): Promise<Mountain> {
    return this.http.get(this.url+'getMountain?mountainId='+id)
      .toPromise()
      .then(response => response.json().data[0] as Mountain)
      .catch(this.handleError);
  }
  public getMountainHeights(id: number): Promise<number[]> {
    return this.http.get(this.url+'getMountainHeights?mountainId='+id)
      .toPromise()
      .then(response => response.json().data as number[])
      .catch(this.handleError);
  }
  public getMountains(): Promise<Mountain[]> {
    return this.http.get(this.url+'getMountains')
      .toPromise()
      .then(response => response.json().data as Mountain[])
      .catch(this.handleError);
  }
  public searchMountains(phrase: string): Promise<Mountain[]> {
    return this.http.get(this.url+'searchMountains?phrase='+phrase)
      .toPromise()
      .then(response => response.json().data as Mountain[])
      .catch(this.handleError);
  }
  public getRandomMountains(count: any): Promise<Mountain[]> {
    return this.http.get(this.url+'getRandomMountains?limit='+count)
      .toPromise()
      .then(response => response.json().data as Mountain[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
