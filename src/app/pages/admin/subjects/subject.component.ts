import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesClient, ClassDto, SubjectsClient, ClassSubjectResponse } from 'src/ClientServices/SchoolHubClientServices';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AddSubjectComponent } from './add-subjects/add-subject.component';

@Component({
  selector: 'admin',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['subjectCode', 'subjectName', 'createdOn', 'actions'];
  searchKey: string;

  model: any = {};
  allClasses: ClassDto[];
  classSubjects: ClassSubjectResponse;
  subjects: MatTableDataSource<any>;
  classId: number;
  classSelected: boolean = false;

  constructor(private _router: Router,
    private _classServices: ClassesClient,
    private _dialog: MatDialog,
    private _subjectService: SubjectsClient) { }


  ngOnInit(): void {
    this.retrieveClasses();
  }

  retrieveClasses(): void {
    this._classServices.retrieveAllClasses()
      .subscribe((response: ClassDto[]) => {
        this.allClasses = response;
      })
  }

  fetchSubjectForClass(id: number): void {
    this.classSelected = true;
    this._subjectService.retrieveAllSubjectsByClassId(id)
      .subscribe((response: ClassSubjectResponse) => {
        this.subjects = new MatTableDataSource(response.subjects);
        this.subjects.sort = this.sort;
        this.classId = id;
      })
  }

  applyFilter() {
    this.subjects.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onCreateSubject() {
    console.log(this.classId)
    this._dialog.open(AddSubjectComponent, {
      width: "40%",
      autoFocus: false,
      disableClose: true,
      data: this.classId,
    }).afterClosed().subscribe(res => {
      this.fetchSubjectForClass(this.classId);
    })
  }
}
