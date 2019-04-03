
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTabChangeEvent } from '@angular/material';
import { AddSubjectComponent } from './add-subjects/add-subject.component';
import { ClassSubjectResponse, ClassDto, ClassesClient, SubjectsClient } from '../../../../ClientServices/SchoolHubClientServices';

@Component({
  selector: 'admin',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit , AfterViewInit{
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

  ngAfterViewInit() { 
    this.fetchSubjectForClass(this.classId);
  }

  retrieveClasses(): void {
    this._classServices.retrieveAllClasses()
      .subscribe((response: ClassDto[]) => {
        this.allClasses = response;
      });
  }

  indexCheck(matTab: MatTabChangeEvent) {
    this.classId = this.allClasses[matTab.index].id;
    this.fetchSubjectForClass(this.classId);
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
