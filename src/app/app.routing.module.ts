import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';


const appRoutes: Routes = [

  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: '.\/auth\/auth.module#AuthModule',
  },
  {
    path: 'admin',
    loadChildren: '.\/pages\/admin\/admin.module#AdminModule',
  },
  {
    path: 'staff',
    loadChildren: '.\/pages\/staff\/staff.module#StaffModule',
  },
  { path: 'page-not-found', component: PageNotFoundComponent },

  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
