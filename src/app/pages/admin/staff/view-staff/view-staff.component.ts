import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';

import { StaffsClient, ClassesClient, } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { UploadService } from 'src/ClientServices/upload.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  @ViewChild("FileInput") FileInput: ElementRef;


  updateStaffDto: any = {};
  showSpinner: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public staff: any, private _staffService: StaffsClient,
    private _uploadService: UploadService,
    private _dialogRef: MatDialogRef<ViewStaffComponent>,
    private _toastr: ToastrManager,
    private _router: Router) { }

  ngOnInit(): void {
  }

  updateStaff(): void {
    this.showSpinner = true;
    this.updateStaffDto.id = this.staff.id;
    this.updateStaffDto.firstname = this.staff.firstname;
    this.updateStaffDto.middlename = this.staff.middlename;
    this.updateStaffDto.lastname = this.staff.lastname;
    console.log(this.updateStaffDto);
    this._staffService.updateStaff(this.updateStaffDto)
      .subscribe((response: boolean) => {
        // this.photoUpload(this.staff.id);
        this.showSpinner = false;
        this.onClose();
        this._toastr.successToastr(`Staff Update was successfully`, "Staff Update", {animate: 'fade'})
      })
  }

   photoUpload(staffId: any) {
    let nativeElement: HTMLInputElement = this.FileInput.nativeElement;
     this._uploadService.photoUpload(staffId, nativeElement.files[0])
      .subscribe((response: string) => {
      })
  }

  onClose() {
    this._dialogRef.close();
  }
}
