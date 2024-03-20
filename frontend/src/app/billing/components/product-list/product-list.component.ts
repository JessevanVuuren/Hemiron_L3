import {Component} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productList: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  private async fetchProducts() {
    (await this.productService
        .getProducts())
        .subscribe((response: Product[]) => {
          this.productList = response;
          this.productList.sort((a, b) => {
              if (a.name < b.name) {
                  return -1;
              }
              if (a.name > b.name) {
                  return 1;
              }
              return 0;
          });
        });
  }
}
