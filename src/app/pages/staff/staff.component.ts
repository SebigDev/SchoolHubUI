import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'staff',
  templateUrl: './staff.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StaffComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
   
  }



  navigateToHome(): void {
    this._router.navigate(['/']);
  }

  navigateToStaffList(): void {
    this._router.navigate(['admin/staffs']);
  }

  navigateToUsersList(): void {
    this._router.navigate(['admin/users']);
  }

  navigateToClassroom(): void {
    this._router.navigate(['staff/classroom']);
  }
}
