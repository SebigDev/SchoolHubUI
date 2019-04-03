import { PageNotFoundComponent } from './../../pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { StaffListComponent } from './staff/staff-list.component';
import { UsersComponent } from './users/users/users.component';
import { StaffDetailComponent } from './staff/staff-detail/staff-detail.component';
import { ClassComponent } from './classes/class.component';
import { SubjectComponent } from './subjects/subject.component';
import { StudentComponent } from './student/student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';


const appRoutes: Routes = [

  {
    path: '', component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'staff-settings', component: StaffListComponent },
      { path: 'staff-settings/:id/staff-detail', component: StaffDetailComponent },
      { path: 'subject-settings', component: SubjectComponent },
      { path: 'class-settings', component: ClassComponent },
      { path: 'students-settings', component: StudentComponent },
      { path: 'students-settings/:id/student-detail', component: ViewStudentComponent },
      { path: 'page-not-found', component: PageNotFoundComponent },
      { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
     ],
  },
]
 

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
