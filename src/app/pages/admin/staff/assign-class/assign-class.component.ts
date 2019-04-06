import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { StaffsClient, ClassesClient, ClassDto, } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { UploadService } from 'src/ClientServices/upload.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'assign-class',
  templateUrl: './assign-class.component.html',
  styleUrls: ['./assign-class.component.css']
})
export class AssignClassComponent implements OnInit {
  classes: ClassDto[] = [];
  model: any = {};
  assignedClassId: number;


  constructor(private _staffService: StaffsClient,
    @Inject(MAT_DIALOG_DATA) public staff: any,
    private _classServices: ClassesClient,
    private _dialogRef: MatDialogRef<AssignClassComponent>,
    private _uploadService: UploadService,
    private _toastr: ToastrManager,
    private _router: Router) { }

  ngOnInit(): void {
    this.retrieveAllClasses();
  }

  retrieveAllClasses(): void {
    this._classServices.retriveUnAssignedClasses(this.staff.id).subscribe((response: ClassDto[]) => {
      this.classes = response;
    })
  }

  saveStaffClassMap() {
    this._classServices.assignClassToStaff(this.staff.id,this.model.id)
      .subscribe((response:number) => {
        this.assignedClassId = response;
        this.onClose();
        this._toastr.successToastr(`Class with ID ${this.model.id} successfully assigned to ${this.staff.firstname}`,
          "Success!!!", { animate: 'fade' });
      }, () => {
        this._toastr.errorToastr(`Class assignment failed`, "Ooops!!!", { animate: 'fade' });
      })
  }

  onClose() {
    this._dialogRef.close();  
  }
}
