import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthenticationClient, UsersClient, UserDto, AuthResponse } from 'src/ClientServices/SchoolHubClientServices';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordChangeComponent implements OnInit {

  model: any = {};
  user: any;
  email: string;
  pwdResponse: AuthResponse;

  constructor(private _authenticationService: AuthenticationClient,
    private _userClient: UsersClient,
    private _toastr: ToastrManager,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.model = {};
    if (localStorage.getItem("token")) {
      this.retrieveUserById(JSON.parse(localStorage.getItem("token")).userId)
    }
    
  }

  passwordChange(): void {
    let oldPassword = this.model.oldPassword;
    let newPassword = this.model.newPassword;
    this._authenticationService.changePassword(this.email, oldPassword, newPassword)
      .subscribe((response: AuthResponse) => {
        this.pwdResponse = response;
        this._toastr.successToastr("Password was Changed Successfully", "Password Change", { animate: "fade" });
        this.navigateToLogin();
      },
      (error) =>{
        this._toastr.errorToastr("Password Change failed", "Password Change", { animate: "fade" });
      })

  }

  retrieveUserById(id: any): void {
    this._userClient.retrieveUserById(id)
      .subscribe((response: UserDto) =>
      {
        this.user = response;
        this.email = response.emailAddress;
      })
  }

  navigateToLogin(): void {
    this._router.navigate(['auth/login']);
  }
  
}
