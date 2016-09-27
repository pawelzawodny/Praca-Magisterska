import { Injectable } from '@angular/core';

@Injectable()
export class config {
  private apiURL: string;

  constructor() {
    this.apiURL = 'http://192.168.57.1:8082/api/';
  }
  getApiUrl() {
    if (process.env.ENV === 'production') {
      return process.env.API_URL;
    } else {
      return this.apiURL;
    }
  }
}
