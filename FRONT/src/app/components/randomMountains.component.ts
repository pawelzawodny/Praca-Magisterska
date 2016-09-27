import { Component } from '@angular/core';

import { MountainService } from './../services/mountain.service';
import { Mountain } from './../models/mountain';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'randomMountains',
  template: `<ul class="heroes">
  <li  *ngFor="let mountain of mountains"><h3 (click)="onSelect(mountain)">{{mountain.name}}</h3> <div><simpleForecast mountainId="{{ mountain.id }}"></simpleForecast></div></li>
  </ul>`,
  providers: [MountainService]
})
export class RandomMountainsComponent {
  mountains: Mountain[];
  constructor(private mountainService: MountainService,  private router: Router) { }
  getMountains() {
    this.mountainService.getRandomMountains(3).then(mountains => this.mountains = mountains);
  }
  onSelect(mountain: Mountain) {
    this.router.navigate(['/mountain', mountain.id]);
  }
  ngOnInit(): void {
    this.getMountains();
  }

}
