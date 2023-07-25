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

  getProductSalesReport() {
    this.salesService.productSalesReport(this.startDate.toISOString(), this.endDate.toISOString()).subscribe({
      next: ((res: any) => {
        this.productsDataSource.data = res.sums.product_sales_sums;
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
  }

  configureInitialDates() {
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(0, 0, 0, 0);
    const tomorrow  = new Date(this.endDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.endDate = tomorrow;
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
