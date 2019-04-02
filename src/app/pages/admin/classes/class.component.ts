import { Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesClient, CreateClassDto, ClassDto, SubjectsClient, CreateSubjectDto } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { AddClassComponent } from './add-class/add-class.component';

@Component({
  selector: 'class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['classCode', 'name', 'createdOn', 'actions'];

  model: any = {};
  classId: number;
  searchKey: string;
  allClasses: MatTableDataSource<any>;
  nClass: ClassDto;
  subjectId: number;
  constructor(private _router: Router,
    private _classService: ClassesClient,
    private _subjectService: SubjectsClient,
    private _dialog: MatDialog,
    private _changeDetectorRefs: ChangeDetectorRef,
    private _toastr: ToastrManager) { }

  ngOnInit(): void {
    this.retriveAllClasses();
  }


  retriveAllClasses(): void {
    this._classService.retrieveAllClasses()
      .subscribe((response: ClassDto[]) => {
        this.allClasses = new MatTableDataSource(response);
        this.allClasses.sort = this.sort;
      })
  }


  applyFilter() {
    this.allClasses.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onCreateClass() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this._dialog.open(AddClassComponent, dialogConfig).afterClosed()
      .subscribe(result =>
      {
        this.refresh();
      })
  }


  refresh() {
    this.retriveAllClasses();
    this._changeDetectorRefs.detectChanges();
  }

  saveSubject(): void {
    let subject = new CreateSubjectDto();
    subject.subjectCode = this.model.subjectCode;
    subject.subjectName = this.model.subjectName;
    subject.createdBy = JSON.parse(localStorage.getItem("token")).userId;
    console.log(subject);

    this._subjectService.createClassSubject(this.nClass.id, subject)
      .subscribe((response: number) => {
        this.subjectId = response;
        this._toastr.successToastr(`${subject.subjectName} Created Successfully`, "Subject Creation", { animate: 'fade' });
      }, (error) => {
        this._toastr.errorToastr("Subject Creation Failed!", "Subject Creation", { animate: 'fade' });
        console.log(error.message);
      })
  }

  navigateToClassDetail(classid: number,classCode: string, className: string) {
    let str1 = classCode.replace(/\s+/g, '').toLowerCase();
    let str2 = className.replace(/\s+/g, '').toLowerCase();

    this._router.navigate([`admin/classSettings/${classid}/${str1}-${str2}`]);
  }
}
