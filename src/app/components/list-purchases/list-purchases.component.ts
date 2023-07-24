import { Component } from '@angular/core';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-list-purchases',
  templateUrl: './list-purchases.component.html',
  styleUrls: ['./list-purchases.component.css']
})
export class ListPurchasesComponent {

  constructor(private purchasesService: PurchasesService) {}
}
