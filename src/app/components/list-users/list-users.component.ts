import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  usersDataSource = new MatTableDataSource<any>([]);
  defaultFilterPredicate !: (data: any, filter: string) => boolean;
  name_filter !: string;
  usersDisplayedColumns = ['no', 'username', 'name', 'roles', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private usersService: UsersService, private _snackBar: SnackBarCustomService) {}

  // open dialog for new user
  openAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined ){
        // do nothing
      }
    });
  }

  // filter by ...names
  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilters(){
    this.usersDataSource.filterPredicate = this.defaultFilterPredicate;
    this.usersDataSource.filter = '';
    this.name_filter = '';
  }

  fetchUsers() {
    this.usersService.listUsers().subscribe({
      next: ((res: any) => {
        this.usersDataSource.data = res;
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
  }

  formatUserRoles(userGroups: any[]): string {
    return userGroups.map(group => group.name).join(', ');
  }

  ngOnInit(): void {
    this.defaultFilterPredicate = this.usersDataSource.filterPredicate;
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
  }

}
