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

  startDate !: string;
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

  // filtering by date
  filterByDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.setDateFilter(event.value);
    }
  }

  setDateFilter(date: Date) {
    this.productsDataSource.filterPredicate = (data: any) => {
      const rowData = new Date(data.created_at);
      return rowData >= date && rowData <= new Date(date.getTime() + 86400000);
    }
    this.productsDataSource.filter = date.toString();
  }

  clearFilters(){
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

  ngOnInit(): void {
    this.defaultFilterPredicate = this.productsDataSource.filterPredicate;
    this.salesService.productSalesReport('2022-12-31T21:00:00.000Z', '2023-11-30T21:00:00.000Z').subscribe({
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

  ngAfterViewInit(): void {
    this.productsDataSource.paginator = this.paginator;
    this.productsDataSource.sort = this.sort;
  }
}
