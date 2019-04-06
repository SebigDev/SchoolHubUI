import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StaffsClient, ClassesClient, CreateStaffDto, UsersClient, UserDto, } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { UploadService } from 'src/ClientServices/upload.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  @ViewChild("FileInput") FileInput: ElementRef;

  model: any = {};
  staffId: number;
  users: UserDto[];
  showSpinner: boolean = false;

  constructor(private _staffService: StaffsClient,
    private _uploadService: UploadService,
    private _userService: UsersClient,
    private _dialogRef: MatDialogRef<AddStaffComponent>,
    private _toastr: ToastrManager,
    private _router: Router) { }

  ngOnInit(): void {
    this.retrieveAllUsers();
  }

  saveStaff(): void {
    this.showSpinner = true;
    let staffDto = new CreateStaffDto();
    staffDto.userId = this.model.id;
    staffDto.firstname = this.model.firstname;
    staffDto.middlename = this.model.middlename;
    staffDto.lastname = this.model.lastname;
    staffDto.gender = this.model.gender;
    staffDto.userType = 2;
    staffDto.dateOfBirth = new Date(this.model.dateOfBirth);
    staffDto.dateEmployed = new Date(this.model.dateEmployed);

    this._staffService.createStaff(staffDto)
      .subscribe((response: number) => {
        this.staffId = response;
        this.photoUpload(this.staffId);
        this.showSpinner = false;
        this.onClose();
        this._toastr.successToastr("Staff Created Successfully!", "Staff Creation", { animate: 'fade' });
      }, () => {
        this.showSpinner = false;
        this._toastr.errorToastr("Staff Creation Failed", "Staff Creation", { animate: 'fade' })
      })
  }

  photoUpload(staffId: any) {
    let nativeElement: HTMLInputElement = this.FileInput.nativeElement;
    this._uploadService.photoUpload(staffId, nativeElement.files[0])
      .subscribe((response: string) => {
        response;
      })
  }

  retrieveAllUsers() {
    this._userService.retrieveAllUsers()
      .subscribe((response: UserDto[]) => {
        this.users = response.filter(s => s.isAdmin == false && s.isUpdated == false);
      })
  }

  onClose() {
    this._dialogRef.close()
  }
}
