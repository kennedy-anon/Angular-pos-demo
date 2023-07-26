import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AuthService } from 'src/app/services/auth.service';
import { SalesService } from 'src/app/services/sales.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userInfo : any;
  allTotals : any;
  startDate : Date = new Date();
  endDate : Date = new Date();

  constructor(private salesService: SalesService, private authService: AuthService, private _snackBar: SnackBarCustomService) {}

  // start date for filtering totals
  setStartDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.startDate = new Date(event.value);
    }
  }

  // end date for filtering totals
  setEndDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.endDate = new Date(event.value);
    }
  }

  // get totals for sales, purchases and credit sales
  getAllTotals() {
    try {
      this.salesService.getAllTotalsReport(this.startDate.toISOString(), this.endDate.toISOString()).subscribe({
        next: ((res: any) => {
          this.allTotals = res.totals;
        }),
        error: (err => {
          if (err.status == 403) {
            this._snackBar.showErrorMessage("Session expired. Kindly login again.");
          } else if (err.status == 400) {
            this._snackBar.showErrorMessage(err.error.detail);
          }
        })
      });
    } catch {
      this._snackBar.showErrorMessage("Invalid date format or missing dates.");
    }
  }

  // initializing filter dates for all totals
  configureInitialDates() {
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);
    const tomorrow  = new Date(this.endDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.endDate = tomorrow;
  }

  // reset filter dates for all totals
  resetFilterDates() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.configureInitialDates();
    this.getAllTotals();
  }

  ngOnInit(): void {
    const access_token = localStorage.getItem('access');

    if (access_token) {
      this.authService.getUserDetails(access_token).subscribe(res => {
        this.userInfo = res;
      })
    }

    this.configureInitialDates();
    this.getAllTotals();
  }
}
