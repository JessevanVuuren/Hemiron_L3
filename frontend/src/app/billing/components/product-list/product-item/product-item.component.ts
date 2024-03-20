import {Component, Input} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() productList: Product[] = [];
  patchProducts: any[] = [];

  constructor(private productService: ProductService) {}

  onSubmit() {
    if (this.patchProducts.length == 0){
      return
    }

    this.productService.patchProducts(this.patchProducts);

    this.patchProducts = [];
  }

  updatePrice(id: any, cost: number) {
    this.patchProducts.push({
      "id": id,
      "costPerUnit": cost
    });
  }
}
