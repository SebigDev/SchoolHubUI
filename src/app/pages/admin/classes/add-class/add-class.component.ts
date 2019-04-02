import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import {  ClassesClient, SubjectsClient, CreateClassDto } from 'src/ClientServices/SchoolHubClientServices';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent implements OnInit {
  model: any = {};
  classId: number;
  users: any;
  showSpinner: boolean = false;

  constructor(private _router: Router,
    private _classService: ClassesClient,
    private _subjectService: SubjectsClient,
    private _dialogRef: MatDialogRef<AddClassComponent>,
    private _toastr: ToastrManager,
  ) { }
  ngOnInit(): void {
    this.retrieveAllClasses()
  }

  retrieveAllClasses() {
    this._classService.retrieveAllClasses()
      .subscribe((response) => {
        response;
      })
  }

  saveClass(): void {
    this.showSpinner = true;
    let nClass = new CreateClassDto();
    nClass.classCode = this.model.classCode;
    nClass.name = this.model.name;
    nClass.category = this.model.category;

    this._classService.createClass(nClass)
      .subscribe((response: number) => {
        this.classId = response;
        this.retrieveAllClasses();
        this.onClose()
        this._toastr.successToastr(`${nClass.name} Created Successfully`, "Class Creation", { animate: 'fade' });
        this.showSpinner = false;
      }, (error) => {
        this.showSpinner = false;
        this._toastr.errorToastr("Class Creation Failed!", "Class Creation", { animate: 'fade' });
      })

  }

  onClose() {
    this._dialogRef.close();
  }
}
