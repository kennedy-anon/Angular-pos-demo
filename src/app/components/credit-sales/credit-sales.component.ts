import { Component, ViewChild } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-credit-sales',
  templateUrl: './credit-sales.component.html',
  styleUrls: ['./credit-sales.component.css']
})
export class CreditSalesComponent {
  defaultFilterPredicate !: (data: any, filter: string) => boolean;
  selectedDate !: string;
  customer_name_filter !: string;
  displayedColumns = ['no', 'created_at', 'customer_name', 'invoice_amount', 'invoice_paid', 'invoice_balance', 'customer_contact_no', 'actions'];
  credit_sales : any = [];
  dataSource = new MatTableDataSource(this.credit_sales);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private salesService: SalesService) {}

  // filtering by customer name
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // filtering by date
  filterByDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.setDateFilter(event.value);
    }
  }

  setDateFilter(date: Date) {
    this.dataSource.filterPredicate = (data: any) => {
      const rowData = new Date(data.created_at);
      return rowData >= date && rowData <= new Date(date.getTime() + 86400000);
    }
    this.dataSource.filter = date.toString();
  }

  clearFilters(){
    this.dataSource.filterPredicate = this.defaultFilterPredicate;
    this.dataSource.filter = '';
    this.customer_name_filter = '';
    this.selectedDate = '';
  }

  // get total amount
  getTotalAmount() {
    return this.credit_sales.reduce((total: number, sale: any) => total + parseFloat(sale.invoice_amount), 0);
  }

  //get total amount paid
  getTotalPaid(){
    return this.credit_sales.reduce((total: number, sale: any) => {
      const paid = sale.invoice_paid !== null ? parseFloat(sale.invoice_paid) : 0;
      return total + paid;
    }, 0);
  }

  // get total balance
  getTotalBalance() {
    return this.credit_sales.reduce((total: number, sale: any) => total + sale.invoice_balance, 0);
  }

  ngOnInit(): void {
    this.defaultFilterPredicate = this.dataSource.filterPredicate;
    this.salesService.getCreditSales().subscribe({
      next: (res => {
        this.credit_sales = res;
        this.dataSource.data = this.credit_sales;
      }),
      error: (err => {
        console.log(err);
      })
    });
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
