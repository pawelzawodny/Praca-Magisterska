import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './../views/navigation.html',
})
export class NavigationComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  goHome() {
    this.router.navigate(['']);
  }
}
