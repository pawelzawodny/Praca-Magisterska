import { Component } from '@angular/core';

import { MountainService } from './../services/mountain.service';
import { Mountain } from './../models/mountain';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'mountains',
  templateUrl: './../views/listingMountains.html',
  providers: [MountainService]
})
export class MountainsComponent {
  mountains: Mountain[];
  phrase: string;
  constructor(
    private mountainService: MountainService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  onSelect(mountain: Mountain) {
    this.router.navigate(['/mountain', mountain.id]);
  }
  searchMountains(phrase: string) {
    this.mountainService.searchMountains(phrase).then(mountains => this.mountains = mountains);
  }
  ngOnInit(): void {
    this.phrase = '';
    this.route.params.forEach((params: Params) => {
      this.phrase = params['phrase'];
    });
    this.searchMountains(this.phrase);
  }

}
