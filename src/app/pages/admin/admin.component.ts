import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState  } from '@angular/cdk/layout';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  openSideNav: boolean = false;
  constructor(private _router: Router, private breakpointObserver: BreakpointObserver) { }


  navigateToHome(): void {
    this._router.navigate(['/']);
  }



  navigateToSubject(): void {
    this._router.navigate(['admin/subject-settings']);
  }

  navigateToStaffList(): void {
    this._router.navigate(['admin/staff-settings']);
  }

  navigateToUsersList(): void {
    this._router.navigate(['admin/users']);
  }

  navigateToClass(): void {
    this._router.navigate(['admin/class-settings'])
  }

  navigateToStudent(): void {
    this._router.navigate(['admin/students-settings'])
  }
}
