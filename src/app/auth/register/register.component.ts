import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto, UsersClient, AuthenticationClient, UserTypeEnum } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  createdUserId: number;
  showSpinner: boolean = false;
  userTypes : any[] = [
    {id: 1, userType: 'Admin'},
    {id: 2, userType: 'Staff'},
    {id: 3, userType: 'Student'}
  ]

  constructor(private _router: Router,
    private _userClientService: UsersClient,
    private _toastr: ToastrManager,
  ) { }

  ngOnInit(): void {
    this.model = {};
    this.retriveUserTypes();
    this.checkAuth();
  }
  UserRegister(): void {
    this.showSpinner = true;
    let user = new CreateUserDto();
    user.username = this.model.username;
    user.emailAddress = this.model.emailAddress;
    user.password = Math.random().toString(36).slice(-12);
    user.isEmailConfirmed = false;
    user.userType = this.model.userType;
    this._userClientService.register(user)
      .subscribe((response: number) => {
        this.createdUserId = response;
        this.showSpinner = false;
        this._toastr.successToastr("Please Check your Mail", "User Registration Succeeded", { animate: "fade" });
        this.navigateToLogin();
      }, (err) => {
        this.showSpinner = false;
        this._toastr.errorToastr("Please Check your Credentials", "User Registration  Failed!", { animate: "fade" });
        console.log(err.message);
      })
  }

  public retriveUserTypes(): void{
    this.userTypes;
  }
  
  showLoad(position: any = "top-center", timeOut: number = 5000, animate: any = "fade"): void {
    this._toastr.infoToastr("Please wait...", "Registering User",
      { position: position, toastTimeOut: timeOut, animate: animate })
  }

  navigateToLogin(): void {
    this._router.navigate(['auth/login'])
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
