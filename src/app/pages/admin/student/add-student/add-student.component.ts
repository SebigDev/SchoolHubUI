import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { UploadService } from 'src/ClientServices/upload.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { CreateStudentDto, StudentsClient } from 'src/ClientServices/SchoolHubClientServices';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @ViewChild("FileInput") FileInput: ElementRef;

  model: any = {};
  studentId: number;
 
  showSpinner: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public classId: any,
    private _uploadService: UploadService,
    private _dialogRef: MatDialogRef<AddStudentComponent>,
    private _toastr: ToastrManager,
    private _studentService: StudentsClient,
    private _router: Router) { }

  ngOnInit(): void {
  }

  saveStaff(): void {
    this.showSpinner = true;
    let studentDto = new CreateStudentDto();
    studentDto.firstname = this.model.firstname;
    studentDto.middlename = this.model.middlename;
    studentDto.lastname = this.model.lastname;
    studentDto.gender = this.model.gender;
    studentDto.dateOfBirth = new Date(this.model.dateOfBirth);
    studentDto.dateOfRegistration = new Date(this.model.dateOfRegistration);

    this._studentService.createStudent(this.classId, studentDto)
      .subscribe((response: number) => {
        this.studentId = response;
        // this.photoUpload(this.studentId);
        this.onClose();
        this.showSpinner = false;
        this._toastr.successToastr("Student Created Successfully!", "Student Creation", { animate: 'fade' });
      }, () => {
        this.showSpinner = false;
        this._toastr.errorToastr("Student Creation Failed", "Student Creation", { animate: 'fade' })
      })
  }

  photoUpload(studentId: any) {
    let nativeElement: HTMLInputElement = this.FileInput.nativeElement;
    this._uploadService.photoUpload(studentId, nativeElement.files[0])
      .subscribe((response: string) => {
      })
  }


  onClose() {
    this._dialogRef.close()
  }
}


