import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateStaffDto, StaffsClient, StaffClassAssIgnedResponse, StaffQualificationResponse } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'staff-update',
  templateUrl: './staff-update.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StaffUpdateComponent implements OnInit {
  model: any = {};
  staffId: number;
  userId: any;
  staff: any;

  constructor(private _router: Router,
    private _staffsService: StaffsClient,
    private _toastr: ToastrManager,
  ) { }


  ngOnInit(): void {
    this.model = {};
  }
  

  saveStaff(): void {
    this.showLoading();
    let staff = new CreateStaffDto();
    staff.userId = this.userId;
    staff.firstname = this.model.firstname;
    staff.middlename = this.model.middlename;
    staff.lastname = this.model.lastname;
    staff.gender = this.model.gender;
    staff.dateOfBirth = new Date(this.model.dateOfBirth);
    staff.dateEmployed = new Date(this.model.dateEmployed);
    console.log(staff);
    this._staffsService.createStaff(staff)
      .subscribe((response: number) => {
        this.staffId = response;
        this.staffPhotoUpload(this.model.photo);
        this._toastr.successToastr("Profile Updated Successfully!", "Staff Profile Update", { animate: 'fade' });
        this.navigateToStaffDashboard();
      }, () => {
        this._toastr.errorToastr("Profile Update Failed!", "Staff Profile Update", { animate: 'fade' });
      })
  }

  retrieveUserId(id: any){
    this._staffsService.retrieveStaffById(id)
      .subscribe((response: StaffQualificationResponse) => {
        this.staff = response.staff;
        this.userId = response.staff.userId;
      })
  }

  showLoading(position: any = "top-center", timeOut: number = 5000, animate: any = "fade"): void {
    this._toastr.infoToastr("Please wait...", "Updating Staff Details",
      { position: position, toastTimeOut: timeOut, animate: animate })
  }

  navigateToStaffDashboard() {
    this._router.navigate(['staff/dashboard']);
  }

  staffPhotoUpload(file: any) {

  }
}
