import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ClassDto, StudentsClient, ClassesClient, StudentClassResponse } from '../../../../ClientServices/SchoolHubClientServices';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['firstname', 'middlename', 'lastname','age', 'gender', 'dateOfRegistration', 'isActive', 'actions'];

  allStudents: MatTableDataSource<any>;
  allClasses: ClassDto[];
  aClass: ClassDto = null;
  searchKey: string;
  model: any = {};
  classId: number;

  constructor(private dialog: MatDialog, private router: Router,
    private _studentService: StudentsClient, private _classService: ClassesClient) { }

  ngOnInit() {
    this.retrieveClasses();
  }

  ngAfterViewInit() { 

    this.retrieveStudentsByClassId(this.classId);
  }

  retrieveClasses() {
    this._classService.retrieveAllClasses()
      .subscribe((response: ClassDto[]) => {
        this.allClasses = response;
        
      })
  }

  indexCheck(matTab: MatTabChangeEvent) {
    this.classId = this.allClasses[matTab.index].id;
    this.retrieveStudentsByClassId(this.classId);
  }

  retrieveClassById(id) {
    this._classService.retrieveClassById(id)
      .subscribe((response: ClassDto) => {
        this.aClass = response;
      })
  }

  retrieveStudentsByClassId(id) {
    this._studentService.retrieveStudentsByClassId(id)
      .subscribe((response: StudentClassResponse) => {
        this.allStudents = new MatTableDataSource(response.students);
        this.allStudents.sort = this.sort;
      })
  }


  applyFilter() {
    this.allStudents.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onCreateStudent() {
    this.dialog.open(AddStudentComponent, {
      autoFocus: false,
      disableClose: true,
      width: "40%",
      data: this.classId
    }).afterClosed().subscribe(res => {
      this.retrieveStudentsByClassId(this.classId);
    })
  }

  viewStudentDetail(id : number) {
    this.router.navigate([`admin/students-settings/${id}/student-detail`])
  }

}
