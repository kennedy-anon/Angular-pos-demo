import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/services/sales.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-product-sales-report',
  templateUrl: './product-sales-report.component.html',
  styleUrls: ['./product-sales-report.component.css']
})
export class ProductSalesReportComponent {

  startDate : Date = new Date();
  endDate : Date = new Date();
  product_name_filter !: string;
  defaultFilterPredicate !: (data: any, filter: string) => boolean;
  productsDataSource = new MatTableDataSource<any>([]);

  productsDisplayedColumns = ['no', 'product_name', 'total_units', 'total_amount'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salesService: SalesService, private _snackBar: SnackBarCustomService) {}

  // filtering by product name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsDataSource.filter = filterValue.trim().toLowerCase();
  }

  // start date for filtering sales
  setStartDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.startDate = new Date(event.value);
    }
  }

  // end date for filtering sales
  setEndDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.endDate = new Date(event.value);
    }
  }

  clearFilters() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.configureInitialDates();
    this.resetFilterProductName();
    this.getProductSalesReport();
  }

  resetFilterProductName() {
    this.productsDataSource.filterPredicate = this.defaultFilterPredicate;
    this.productsDataSource.filter = '';
    this.product_name_filter = '';
  }

  // get total amount
  getTotalAmount() {
    return this.productsDataSource.filteredData.reduce((total: number, product: any) => total + parseFloat(product.total_amount), 0);
  }

  // get total units
  getTotalUnits() {
    return this.productsDataSource.filteredData.reduce((total: number, product: any) => total + parseFloat(product.total_units), 0);
  }

  // fetches the product sales report
  getProductSalesReport() {
    const end_date = this.includeWholeDay(this.endDate);
    try {
      this.salesService.productSalesReport(this.startDate.toISOString(), end_date.toISOString()).subscribe({
        next: ((res: any) => {
          this.productsDataSource.data = res.sums.product_sales_sums;
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

  configureInitialDates() {
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);
  }

  // sets end date to the start of next day to include all 24 hrs
  includeWholeDay(day: Date) {
    const end_date = new Date(day);
    end_date.setDate(end_date.getDate() + 1);
    return end_date;
  }

  ngOnInit(): void {
    this.defaultFilterPredicate = this.productsDataSource.filterPredicate;
    this.configureInitialDates();
    this.getProductSalesReport();
  }

  ngAfterViewInit(): void {
    this.productsDataSource.paginator = this.paginator;
    this.productsDataSource.sort = this.sort;
  }
}
