import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AppBootstrapModule } from 'src/app-bootstrap.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { HomeHeaderComponent } from './layout/home/header/home-header.component';
import { MaterialModule } from 'src/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeHeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule, 
    AppBootstrapModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    FlexLayoutModule
   

  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
