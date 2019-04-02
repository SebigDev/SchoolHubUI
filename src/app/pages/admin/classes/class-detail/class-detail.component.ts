import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassesClient, ClassDto,  CreateStudentDto, StudentsClient, StudentClassResponse } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'class-detail',
  templateUrl: './class-detail.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassDetailComponent implements OnInit {

  model: any = {};
  classId: number;
  students: any[];
  studentId: any;

  constructor(private _router: Router,
    private _studentService: StudentsClient,
    private _classService: ClassesClient,
    private _toastr: ToastrManager,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.retrieveClassDetail(params.id);
      this.retrieveStudentsByClassId(params.id);
    })
  }

  retrieveClassDetail(id: any) {
    this._classService.retrieveClassById(id)
      .subscribe((response: ClassDto) => {
        this.classId = response.id;
      })
  }

  saveStudent(): void {
    let nStudent = new CreateStudentDto();
    nStudent.firstname = this.model.firstname;
    nStudent.middlename = this.model.middlename;
    nStudent.lastname = this.model.lastname;
    nStudent.dateOfBirth = new Date(this.model.dateOfBirth);
    nStudent.gender = this.model.gender;

    this._studentService.createStudent(this.classId,nStudent)
      .subscribe((response: number) => {
        this.studentId = response;
        this._toastr.successToastr(`${nStudent.firstname} Created Successfully`, "Student Creation", { animate: 'fade' });
        this.retrieveStudentsByClassId(this.classId);
      }, (error) => {
        this._toastr.errorToastr("Student Creation Failed!", "Student Creation", { animate: 'fade' });
        console.log(error.message);
      })

  }

  retrieveStudentsByClassId(id: number): void {
    this._studentService.retrieveStudentsByClassId(id)
      .subscribe((response: StudentClassResponse) => {
        this.students = response.students;
      })
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
}
