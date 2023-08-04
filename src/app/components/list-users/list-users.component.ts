import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddUserComponent } from 'src/app/dialogs/add-user/add-user.component';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';
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

  constructor(public dialog: MatDialog, private usersService: UsersService, private _snackBar: SnackBarCustomService, private router: Router) {}

  // pass user data for editing
  passUserData(user: any) {
    this.usersService.setUserData(user);
    this.router.navigate(['/users/edit']);
  }

  // open dialog for new user
  openAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined ){
        this.fetchUsers();
      }
    });
  }

  // open confirm delete dialog
  confirmDelete(user: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {name: user.username},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete' ){
        this.deleteUser(user);
      }
    });
  }

  // delete user
  deleteUser(user: any){
    this.usersService.deleteUser(user.id).subscribe({
      next: (res => {
        res.status == 200 ? this._snackBar.showSuccessMessage(`User '${user.username}' deleted successfully.`): undefined;
        this.fetchUsers();
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        } else if (err.status == 404) {
          this._snackBar.showErrorMessage(err.error.detail);
        }
      })
    })
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
