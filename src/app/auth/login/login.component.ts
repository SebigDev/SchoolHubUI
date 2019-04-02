import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersClient, UserLoginResponse, UserDto } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  authResponse: any;
  logUser: any;
  showSpinner:boolean = false;

  constructor(private _router: Router,
    private _userClientService: UsersClient,
    private _toastr: ToastrManager,
  ) { }

  ngOnInit(): void {
    this.model = {};
    this.checkAuth();
  }

  UserLogin(): void {
    this.showSpinner = true;
    let emailAddress = this.model.emailAddress;
    let password = this.model.password;
    let username = null;

    this._userClientService.login(username, emailAddress, password)
      .subscribe((response: UserLoginResponse) => {
        this.authResponse = response;
        localStorage.setItem('token', JSON.stringify(response));
        this.showSpinner = false;
        this._toastr.successToastr(`${emailAddress}`, `Welcome !`, { animate: "fade" });
        this.roleCheck(emailAddress);
      },
      (error) => {
        this.showSpinner = false;
        console.log(error.message);
        this._toastr.errorToastr("Please Check your Credentials", "Login Failed!", { animate: "fade"});
      })
  }

 public roleCheck(email: string): void{
   this._userClientService.retrieveUserByEmail(email).subscribe((response:UserDto)=>{
     this.logUser = response;
     //check if user password is changed;
     if(response.isEmailConfirmed === false){
       this.navigateToChangePassword();
     }
     else if(response.isEmailConfirmed === true && response.isAdmin === true){
       this.navigateToAdminDashBoard();
     }
     else if(response.isAdmin === false && response.isEmailConfirmed === true && response.isUpdated === true){
       this.navigateToStaffDashboard();
     }
     else if(response.isAdmin === false &&  response.isUpdated == false){
       this.navigateToStaffProfileUpdate(response.id);
     }
   })
 }


  showLoad(position: any = "top-center", timeOut: number = 5000, animate: any = "fade"): void {
    this._toastr.infoToastr("Please wait...", "Authenticating User",
      { position: position, toastTimeOut: timeOut, animate: animate })
  }
  navigateToRegister(): void {
    this._router.navigate(['auth/register'])
  }

  navigateToChangePassword(): void {
    this._router.navigate(['auth/password-change']);
  }

  navigateToAdminDashBoard(): void {
    this._router.navigate(['admin/dashboard']);
  }

  navigateToStaffDashboard(): void {
    this._router.navigate(['staff/dashboard']);
  }

  navigateToStaffProfileUpdate(id: any): void {
    this._router.navigate([`staff/${id}/staff-update`]);
  }

  navigateToHome(): void {
    this._router.navigate(['/'])
  }
  checkAuth() {
    if (this.isLoggedIn()) {
      this.navigateToHome();
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }
}
