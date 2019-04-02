import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StaffRoutingModule } from './staff.routing.module';
import { StaffComponent } from './staff.component';
import { StaffDashboardComponent } from './dashboard/staff-dashboard.component';
import { StaffUpdateComponent } from './staff-update/staff-update.component';
import { FormsModule } from '@angular/forms';
import { ClassromComponent } from './classroom/classroom.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StaffRoutingModule,
    FormsModule
  ],
  declarations: [
    StaffComponent,
    StaffDashboardComponent,
    StaffUpdateComponent,
    ClassromComponent,
  ]
})
export class StaffModule { }
