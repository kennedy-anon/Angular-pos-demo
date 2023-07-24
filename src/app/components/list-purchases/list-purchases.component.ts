import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-list-purchases',
  templateUrl: './list-purchases.component.html',
  styleUrls: ['./list-purchases.component.css']
})
export class ListPurchasesComponent {
  defaultFilterPredicate !: (data: any, filter: string) => boolean;
  selectedDate !: string;
  product_name_filter !: string;
  purchasesDataSource = new MatTableDataSource<any>([]);
  purchasesDisplayedColumns = ['no', 'created_at', 'product_name', 'units', 'buying_price'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private purchasesService: PurchasesService, private _snackBar: SnackBarCustomService) {}

  // filtering by product name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.purchasesDataSource.filter = filterValue.trim().toLowerCase();
  }

  // filtering by date
  filterByDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.setDateFilter(event.value);
    }
  }

  setDateFilter(date: Date) {
    this.purchasesDataSource.filterPredicate = (data: any) => {
      const rowData = new Date(data.created_at);
      return rowData >= date && rowData <= new Date(date.getTime() + 86400000);
    }
    this.purchasesDataSource.filter = date.toString();
  }

  clearFilters(){
    this.purchasesDataSource.filterPredicate = this.defaultFilterPredicate;
    this.purchasesDataSource.filter = '';
    this.product_name_filter = '';
    this.selectedDate = '';
  }

  getTotalPurchases() {
    return this.purchasesDataSource.filteredData.reduce((total: number, purchase: any) => total + parseFloat(purchase.buying_price), 0);
  }

  ngOnInit(): void {
    this.defaultFilterPredicate = this.purchasesDataSource.filterPredicate;
    this.purchasesService.getAllPurchases().subscribe({
      next: ((res: any) => {
        this.purchasesDataSource.data = res;
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
    
  }

  ngAfterViewInit(): void {
    this.purchasesDataSource.paginator = this.paginator;
    this.purchasesDataSource.sort = this.sort;
  }
}
