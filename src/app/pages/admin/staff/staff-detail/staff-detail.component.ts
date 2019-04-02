import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { StaffsClient, StaffDto, ClassesClient, ClassDto, StaffQualificationResponse} from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'staff-detail',
  templateUrl: './staff-detail.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StaffDetailComponent implements OnInit {
  allStaff: any[];
  model: any = {};
  allClasses: ClassDto[];
  nStaff: StaffDto;
  staffId: number;
  staffClassMapId: number;


  constructor(private _staffService: StaffsClient,
    private _classServices: ClassesClient, private _toastr: ToastrManager) { }

  ngOnInit(): void {
    
  }

  
}
