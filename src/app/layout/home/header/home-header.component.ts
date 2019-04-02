import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-header',
  templateUrl: './home-header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HomeHeaderComponent {
  constructor(private _router: Router) { }

  navigateToLogin(): void {
    this._router.navigate(['auth/login']);
  }

  navigateToRegister(): void {
    this._router.navigate(['auth/register']);
  }
}
