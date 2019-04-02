import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { UsersClient, UserDto } from 'src/ClientServices/SchoolHubClientServices';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['emailAddress','username','userType','isUpdated','actions'];
  searchKey: string;
  allUsers: MatTableDataSource<any>;
  constructor(private _usersService: UsersClient) { }

  ngOnInit(): void {
    this.retrieveAllUsers();
  }


  retrieveAllUsers(): void {
    this._usersService.retrieveAllUsers()
      .subscribe((response: UserDto[]) => {
        this.allUsers = new MatTableDataSource(response);
        this.allUsers.sort = this.sort;
      })
  }

  returnUserType(id: any): string {
    if (id === 1) {
      return `Administrator`;
    }
    if (id === 2) {
      return `Staff`; 
    }
    if (id === 3) {
      return `Student`;
    }
  }

  applyFilter() {
    this.allUsers.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
}
