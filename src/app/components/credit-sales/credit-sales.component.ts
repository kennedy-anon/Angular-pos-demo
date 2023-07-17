import { Component } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-credit-sales',
  templateUrl: './credit-sales.component.html',
  styleUrls: ['./credit-sales.component.css']
})
export class CreditSalesComponent {
  displayedColumns = ['no', 'created_at', 'customer_name', 'invoice_amount', 'invoice_paid', 'invoice_balance', 'customer_contact_no', 'actions'];
  credit_sales : any = [];

  constructor(private salesService: SalesService) {}

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
    this.salesService.getCreditSales().subscribe({
      next: (res => {
        this.credit_sales = res;
      }),
      error: (err => {
        console.log(err);
      })
    });
    
  }
}
