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
  last30DaysSales : any;
  monthlySales : any
  last30DaysSalesDataPoints : any[] = [];
  monthlySalesDataPoints : any[] = [];

  last30DaysSalesShowChart = false;
  monthlySalesShowChart = false;

  axisY = {
    labelFormatter: (e: any) => {
      var suffixes = ["", "K", "M", "B", "T"];

      var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
      if(order > suffixes.length - 1)
        order = suffixes.length - 1;

      var suffix = suffixes[order];
      return "" + (e.value / Math.pow(1000, order)) + suffix;
    }
  }

  last30DaysSalesChartOptions = {
    theme: "light2",
		animationEnabled: true,
		zoomEnabled: true,
		title: {
			text: ""
		},
    axisY: this.axisY,
    data: [
      {
        type: "line",
        dataPoints: [this.last30DaysSalesDataPoints]
      }
    ]
  }

  monthlySalesChartOptions = {
    theme: "light2",
		animationEnabled: true,
		zoomEnabled: true,
		title: {
			text: ""
		},
    axisX: {
      valueFormatString: "MMM YYYY" // Format the x-axis values to display month and year
    },
    axisY: this.axisY,
    data: [
      {
        type: "line",
        dataPoints: [this.monthlySalesDataPoints]
      }
    ]
  }

  constructor(private salesService: SalesService, private authService: AuthService, private _snackBar: SnackBarCustomService) {}

  // formating last30DaysSales to line graph datapoints
  formatLast30DaysSales() {
    this.last30DaysSalesDataPoints = this.last30DaysSales.map((sale: any) => ({
      x: new Date(sale.date),
      y: sale.total_sales !== null? sale.total_sales : 0
    }));

    this.last30DaysSalesChartOptions.data[0].dataPoints = this.last30DaysSalesDataPoints;
    this.last30DaysSalesShowChart = true
  }

  // formatting monthly sales for line graph
  formatMonthlySales() {
    this.monthlySalesDataPoints = this.monthlySales.map((sale: any) => ({
      x: new Date(sale.start_date),
      y: sale.total_sales !== null? sale.total_sales : 0
    }));

    this.monthlySalesChartOptions.data[0].dataPoints = this.monthlySalesDataPoints;
    this.monthlySalesShowChart = true;
  }

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
          this.handleFetchErrors(err);
        })
      });
    } catch {
      this._snackBar.showErrorMessage("Invalid date format or missing dates.");
    }
  }

  // get sales for the last 30 days
  getLast30DaysSales() {
    const end_date = this.getTomorrowMidnight()

    try {
      this.salesService.getLast30DaySales(end_date.toISOString()).subscribe({
        next: ((res: any) => {
          this.last30DaysSales = res.total_sales_by_day;
          this.formatLast30DaysSales();
        }),
        error: (err => {
          this.handleFetchErrors(err);
        })
      });
    } catch {
      this._snackBar.showErrorMessage("Invalid date format or missing dates.");
    }
  }

  // get monthly sales
  getMonthlySales() {
    const end_date = this.getTomorrowMidnight()

    try {
      this.salesService.getMonthlySales(end_date.toISOString()).subscribe({
        next: ((res: any) => {
          this.monthlySales = res.monthly_sales;
          this.formatMonthlySales();
        }),
        error: (err => {
          this.handleFetchErrors(err);
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

  // returns start of the next day
  getTomorrowMidnight() {
    const tomorrow = new Date()
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  // handling fetch errors
  handleFetchErrors(err: any) {
    if (err.status == 403) {
      this._snackBar.showErrorMessage("Session expired. Kindly login again.");
    } else if (err.status == 400) {
      this._snackBar.showErrorMessage(err.error.detail);
    }
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
    this.getLast30DaysSales();
    this.getMonthlySales();
  }
}
