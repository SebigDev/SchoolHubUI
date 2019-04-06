import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState  } from '@angular/cdk/layout';
import { UsersClient, UserDto } from '../../../ClientServices/SchoolHubClientServices';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  openSideNav: boolean = false;
  userDto: any;
  constructor(private _router: Router, private breakpointObserver: BreakpointObserver,
  private _userService: UsersClient) { }

  ngOnInit(): void {
    this.retrieveLoggedAdmin();
  }

  public retrieveLoggedAdmin() {
    const userId = JSON.parse(localStorage.getItem('token')).userId;
    this._userService.retrieveUserById(userId).subscribe((response: UserDto) => {
      this.userDto = response;
    })
  }

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

  navigateToLogout(): void {
    localStorage.removeItem('token');
    this.navigateToHome();
  }
}
