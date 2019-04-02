import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordChangeComponent } from './passwordchange/passwordchange.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { MaterialModule } from 'src/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordChangeComponent,
    AuthComponent
  ]
})
export class AuthModule { }
