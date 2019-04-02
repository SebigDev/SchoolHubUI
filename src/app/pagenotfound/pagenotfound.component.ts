import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'body',
  templateUrl: './pagenotfound.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageNotFoundComponent {
  constructor(private _router: Router) { }

  navigateTohome(): void {
    this._router.navigate(['/']);
  }
}
