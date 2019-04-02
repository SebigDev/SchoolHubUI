import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StaffsClient, ClassesClient, } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { UploadService } from 'src/ClientServices/upload.service';

@Component({
  selector: 'delete-staff',
  templateUrl: './delete-staff.component.html',
  styleUrls: ['./delete-staff.component.css']
})
export class DeleteStaffComponent implements OnInit {


  constructor(private _staffService: StaffsClient,
    private _classServices: ClassesClient,
    private _uploadService: UploadService,
    private _toastr: ToastrManager,
    private _router: Router) { }

  ngOnInit(): void {

  }




}
