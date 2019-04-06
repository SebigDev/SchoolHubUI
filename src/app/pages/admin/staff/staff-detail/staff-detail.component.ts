import { Component, OnInit } from '@angular/core';
import { StaffsClient, StaffDto, ClassesClient, ClassDto, StaffQualificationResponse, StaffClassAssIgnedResponse, StudentsClient, StudentClassResponse} from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
  allStaff: any[];
  model: any = {};
  allClasses: ClassDto[];
  nStaff: StaffDto;
  staffId: number;
  staffClassMapId: number;
  classAssigned: ClassDto[];
  className: ClassDto;
  students: any[] = [];

  constructor(private _staffService: StaffsClient,
    private _activatedRoute: ActivatedRoute,
    private _classServices: ClassesClient,
    private _studentService: StudentsClient,
    private _router: Router,
    private _toastr: ToastrManager) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.retrieveStaffById(params.id);
      this.retrieveStudentsByClass(params.id);
    })
  }


  retrieveStaffById(id: number): void {
    this._staffService.retrieveStaffById(id).subscribe((response: StaffQualificationResponse) => {
      this.nStaff = response.staff;
    })
  }

  retrieveStudentsByClass(id: any): void {
    this._classServices.retrieveAssignedClassToStaff(id).subscribe((response: StaffClassAssIgnedResponse) => {
      this.classAssigned = response.classes;
      for(let a of this.classAssigned){
        this.retrieveAllStudentsInClass(a.id)
      }
    })
  }

  retrieveAllStudentsInClass(id: any): void {
    this._studentService.retrieveStudentsByClassId(id).subscribe((response: StudentClassResponse) => {
      this.students = response.students;
    })
  }

  navigateToStudent(id: any) {
    this._router.navigate([`admin/students-settings/${id}/student-detail`])
  }
}
