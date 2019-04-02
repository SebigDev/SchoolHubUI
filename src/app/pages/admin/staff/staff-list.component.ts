import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { StaffsClient, StaffDto, ClassesClient, ClassDto, StaffQualificationResponse, StaffClassAssIgnedResponse} from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { UploadService } from 'src/ClientServices/upload.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { AssignClassComponent } from './assign-class/assign-class.component';

@Component({
  selector: 'staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['firstname', 'middlename', 'lastname', 'gender','dateEmployed','isActive','actions'];

  searchKey: string;
  allStaffs: MatTableDataSource<any>;
  model: any = {};
  allClasses: ClassDto[];

  file: any;


  constructor(private _staffService: StaffsClient,
    private _classServices: ClassesClient,
    private _uploadService: UploadService,
    private _changeDetectRef: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _toastr: ToastrManager,
    private _router: Router) { }

  ngOnInit(): void {
    this.retrieveAllStaffs();
  }

  retrieveAllStaffs(): void {
    this._staffService.retrieveAllStaffs()
      .subscribe((response: StaffDto[]) => {
        this.allStaffs = new MatTableDataSource(response);
        this.allStaffs.sort = this.sort;
     })
  }

  applyFilter() {
    this.allStaffs.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onCreateStaff() {
    this._dialog.open(AddStaffComponent, {
      width: "40%",
      autoFocus: true,
      disableClose: true,
    }).afterClosed().subscribe(res => {
      this.refresh();
    })
  }

  onViewStaff(staff) {
    this._dialog.open(ViewStaffComponent, {
      width: "40%",
      autoFocus: false,
      disableClose: true,
      data: staff
    }).afterClosed().subscribe(res => {
      this.refresh();
    })
  }

  onAssignClass(staff) {
    this._dialog.open(AssignClassComponent, {
      width: "40%",
      autoFocus: false,
      disableClose: true,
      data: staff
    }).afterClosed().subscribe(res => {
      this.refresh();
    })
  }



  refresh() {
    this.retrieveAllStaffs();
    this._changeDetectRef.detectChanges();
  }


  retrieveClasses(): void {
    this._classServices.retrieveAllClasses()
      .subscribe((response: ClassDto[]) => {
        this.allClasses = response;
        
      })
  }

  navigateToStaffDetails(id: any): void {
    this._router.navigate([`admin/staffSettings/${id}/staff-detail`])
  }


}
