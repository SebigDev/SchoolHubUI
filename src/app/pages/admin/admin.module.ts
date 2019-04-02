import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { StaffListComponent } from './staff/staff-list.component';
import { UsersComponent } from './users/users/users.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { ClassComponent } from './classes/class.component';
import { FormsModule } from '@angular/forms';
import { ClassDetailComponent } from './classes/class-detail/class-detail.component';
import { StaffDetailComponent } from './staff/staff-detail/staff-detail.component';
import { MaterialModule } from 'src/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { TableComponent } from '../table/table.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { ViewStaffComponent } from './staff/view-staff/view-staff.component';
import { DeleteStaffComponent } from './staff/delete-staff/delete-staff.component';
import { AssignClassComponent } from './staff/assign-class/assign-class.component';
import { AddClassComponent } from './classes/add-class/add-class.component';
import { SubjectComponent } from './subjects/subject.component';
import { AddSubjectComponent } from './subjects/add-subjects/add-subject.component';
import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { DeleteStudentComponent } from './student/delete-student/delete-student.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    StaffListComponent,
    StaffDetailComponent,
    UsersComponent,
    ClassComponent,
    ClassDetailComponent,
    SubjectComponent,
    AddStaffComponent,
    ViewStaffComponent,
    DeleteStaffComponent,
    AssignClassComponent,
    AddClassComponent,
    AddSubjectComponent,
    TableComponent,
    StudentComponent,
    AddStudentComponent,
    ViewStudentComponent,
    DeleteStudentComponent,
    StudentDetailComponent
  ],
  entryComponents: [
    AddStaffComponent,
    ViewStaffComponent,
    DeleteStaffComponent,
    AssignClassComponent,
    AddClassComponent,
    AddSubjectComponent,
    AddStudentComponent,
  ]
})
export class AdminModule { }
