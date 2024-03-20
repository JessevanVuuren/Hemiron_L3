import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Product} from "../../shared/models/product.model";
import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpService) { }

  async getProducts() {
    return this.http
        .get<Product[]>("/products")
        .pipe(
            map((response: Product[]) => {
                  return response
                }
            )
        )
  }

  patchProducts(products: Product[]) {
    this.http.patch("/products", products).subscribe();
  }
}
