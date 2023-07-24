import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/services/sales.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css']
})
export class AllSalesComponent {
  defaultFilterPredicate !: (data: any, filter: string) => boolean;
  selectedDate !: string;
  product_name_filter !: string;
  salesDataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['no', 'created_at', 'product_name', 'units', 'amount', 'sale_type'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salesService: SalesService, private _snackBar: SnackBarCustomService) {}

  // filtering by product name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.salesDataSource.filter = filterValue.trim().toLowerCase();
  }

  // filtering by date
  filterByDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.setDateFilter(event.value);
    }
  }

  setDateFilter(date: Date) {
    this.salesDataSource.filterPredicate = (data: any) => {
      const rowData = new Date(data.created_at);
      return rowData >= date && rowData <= new Date(date.getTime() + 86400000);
    }
    this.salesDataSource.filter = date.toString();
  }

  clearFilters(){
    this.salesDataSource.filterPredicate = this.defaultFilterPredicate;
    this.salesDataSource.filter = '';
    this.product_name_filter = '';
    this.selectedDate = '';
  }

  // get total amount
  getTotalAmount() {
    return this.salesDataSource.filteredData.reduce((total: number, sale: any) => total + parseFloat(sale.amount), 0);
  }

  ngOnInit(): void {
    this.defaultFilterPredicate = this.salesDataSource.filterPredicate;
    this.salesService.getAllSales().subscribe({
      next: ((res: any) => {
        this.salesDataSource.data = res;
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    })
    
  }

  ngAfterViewInit(): void {
    this.salesDataSource.paginator = this.paginator;
    this.salesDataSource.sort = this.sort;
  }
}
