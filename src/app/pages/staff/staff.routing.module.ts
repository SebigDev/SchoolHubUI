import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pagenotfound/pagenotfound.component';
import { StaffComponent } from './staff.component';
import { StaffDashboardComponent } from './dashboard/staff-dashboard.component';
import { StaffUpdateComponent } from './staff-update/staff-update.component';
import { ClassromComponent } from './classroom/classroom.component';



const appRoutes: Routes = [

  {
    path: '', component: StaffComponent,
    children: [
      { path: 'dashboard', component: StaffDashboardComponent },
      { path: ':id/staff-update', component: StaffUpdateComponent },
      { path: 'classroom', component: ClassromComponent },
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },

  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
