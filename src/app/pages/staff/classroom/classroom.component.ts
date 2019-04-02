import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentsClient, ClassesClient, StaffsClient, StaffQualificationResponse, StaffClassAssIgnedResponse, StudentClassResponse } from 'src/ClientServices/SchoolHubClientServices';

@Component({
  selector: 'classroom',
  templateUrl: './classroom.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassromComponent implements OnInit {
  staff: any;
  classAssigned: any;
  students: any[];

  constructor(private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _studentService: StudentsClient,
    private _classService: ClassesClient,
    private _staffService: StaffsClient
  ) { }

  ngOnInit() {
    let userId = JSON.parse(localStorage.getItem("token")).userId;
    this.retrieveStaffByUserId(userId);
     
  }

  retrieveStaffByUserId(id: any) {
    this._staffService.retrieveStaffByUserId(id)
      .subscribe((response: StaffQualificationResponse) => {
        this.staff = response.staff;
        this.retrieveClassByStaffId(response.staff.id);
      })
  }

  retrieveClassByStaffId(id: any) {
    this._classService.retrieveAssignedClassToStaff(id)
      .subscribe((response: StaffClassAssIgnedResponse) => {
        this.classAssigned = response.classes[0];
        console.log(this.classAssigned)
        this.retrieveStudentsByClassId(this.classAssigned.id);
      })
  }

  retrieveStudentsByClassId(id) {
    this._studentService.retrieveStudentsByClassId(id)
      .subscribe((response: StudentClassResponse) => {
        this.students = response.students;
      })
  }

  navigateToStudentDetail(id: any): void {
    this._router.navigate([`staff/classroom/${id}/student-detail`]);
  }

}
