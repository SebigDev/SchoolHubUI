import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { StaffsClient, ClassesClient, ClassDto, } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { UploadService } from 'src/ClientServices/upload.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'assign-class',
  templateUrl: './assign-class.component.html',
  styleUrls: ['./assign-class.component.css']
})
export class AssignClassComponent implements OnInit {
  classes: ClassDto[] = [];
  model: any = {};
  constructor(private _staffService: StaffsClient,
    @Inject(MAT_DIALOG_DATA) public staff: any,
    private _classServices: ClassesClient,
    private _uploadService: UploadService,
    private _toastr: ToastrManager,
    private _router: Router) { }

  ngOnInit(): void {
    this.retrieveClassForAssigning(this.staff.id);
  }


  retrieveClassForAssigning(staffId: any) {
    this._classServices.retriveUnAssignedClasses(staffId)
      .subscribe((response: ClassDto[]) => {
        this.classes = response;
      })
  }

  saveStaffClassMap(): void {


  }
}
