import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-custom',
  templateUrl: './snack-bar-custom.component.html',
  styleUrls: ['./snack-bar-custom.component.css']
})
export class SnackBarCustomComponent {

  constructor(private _snackBar: MatSnackBar) {}

  showSuccessMessage(message: any) {
    this._snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success-snackbar', 'mat-simple-snackbar-action'],
    });
  }

  showErrorMessage(message: any) {
    this._snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar', 'mat-simple-snackbar-action'],
    });
  }
}
