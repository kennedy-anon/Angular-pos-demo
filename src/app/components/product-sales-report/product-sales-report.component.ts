import { Component } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-product-sales-report',
  templateUrl: './product-sales-report.component.html',
  styleUrls: ['./product-sales-report.component.css']
})
export class ProductSalesReportComponent {

  constructor(private salesService: SalesService) {}
}
