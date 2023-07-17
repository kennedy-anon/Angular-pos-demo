import { Component } from '@angular/core';

@Component({
  selector: 'app-credit-sales',
  templateUrl: './credit-sales.component.html',
  styleUrls: ['./credit-sales.component.css']
})
export class CreditSalesComponent {
  displayedColumns = ['no', 'created_at', 'customer_name', 'invoice_amount', 'invoice_paid', 'invoice_balance', 'customer_contact_no', 'actions'];
  credit_sales : any = [];
}
