import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
   
  }



  navigateToHome(): void {
    this._router.navigate(['/']);
  }

  navigateToLogin(): void {
    this._router.navigate(['auth/login']);
  }

  navigateToRegister(): void {
    this._router.navigate(['auth/register']);
  }

  navigateToLogout(): void {
  localStorage.removeItem('token');
  this.navigateToLogin();
  }
}
