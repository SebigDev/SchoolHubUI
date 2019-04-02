import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersClient, AuthenticationClient, StaffsClient, ClassesClient, SubjectsClient, StudentsClient } from 'src/ClientServices/SchoolHubClientServices';
import { PageNotFoundComponent } from '../pagenotfound/pagenotfound.component';
import { UploadService } from 'src/ClientServices/upload.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PageNotFoundComponent,
  ],
  providers: [
    UsersClient,
    AuthenticationClient,
    StaffsClient,
    ClassesClient,
    SubjectsClient,
    StudentsClient,
    UploadService
  ]

})
export class SharedModule { }
