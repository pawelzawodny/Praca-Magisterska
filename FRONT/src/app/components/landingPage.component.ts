import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './../views/lp.html'
})
export class LanginPageComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  search(value: String) {
    this.router.navigate(['/search', value]);
  }
  ngAfterViewInit() {

  }

}
