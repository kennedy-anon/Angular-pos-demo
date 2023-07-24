import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/services/products.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-stock-running-low',
  templateUrl: './stock-running-low.component.html',
  styleUrls: ['./stock-running-low.component.css']
})
export class StockRunningLowComponent {
  defaultFilterPredicate !: (data: any, filter: string) => boolean;
  product_name_filter !: string;
  productsDataSource = new MatTableDataSource<any>([]);
  productsDisplayedColumns = ['no', 'product_name', 'available_units', 'min_units_alert'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private productsService: ProductsService, private _snackBar: SnackBarCustomService) {}

  // filter by product name
  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsDataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilters(){
    this.productsDataSource.filterPredicate = this.defaultFilterPredicate;
    this.productsDataSource.filter = '';
    this.product_name_filter = '';
  }

  ngOnInit(): void {
    this.defaultFilterPredicate = this.productsDataSource.filterPredicate;
    this.productsService.getLowOnStock().subscribe({
      next: ((res: any) => {
        this.productsDataSource.data = res;
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    })
    
  }

  ngAfterViewInit(): void {
    this.productsDataSource.paginator = this.paginator;
    this.productsDataSource.sort = this.sort;
  }

}
