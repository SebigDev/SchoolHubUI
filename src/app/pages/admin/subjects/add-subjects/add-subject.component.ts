import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {  ClassesClient, SubjectsClient, CreateSubjectDto } from 'src/ClientServices/SchoolHubClientServices';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
})
export class AddSubjectComponent implements OnInit {
  model: any = {};
  users: any;
  showSpinner: boolean = false;

  constructor(private _router: Router,
    @Inject(MAT_DIALOG_DATA) public classId: any,
    private _classService: ClassesClient,
    private _subjectService: SubjectsClient,
    private _dialogRef: MatDialogRef<AddSubjectComponent>,
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

  saveSubject(): void {
    this.showSpinner = true;
    let nSubj = new CreateSubjectDto();
    nSubj.subjectCode = this.model.subjectCode;
    nSubj.subjectName = this.model.subjectName;

    this._subjectService.createClassSubject(this.classId, nSubj)
      .subscribe((response: number) => {
        this.classId = response;
        this.retrieveAllClasses();
        this.onClose()
        this._toastr.successToastr(`${nSubj.subjectName} Created Successfully`, "Subject Creation", { animate: 'fade' });
        this.showSpinner = false;
      }, (_error: {}) => {
        this.showSpinner = false;
        this._toastr.errorToastr("Subject Creation Failed!", "Subject Creation", { animate: 'fade' });
      })

  }

  onClose() {
    this._dialogRef.close();
  }
}
