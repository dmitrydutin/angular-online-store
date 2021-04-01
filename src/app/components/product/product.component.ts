import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { BasketService } from 'src/app/shared/basket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public id: string;
  public product: Product;
  public containInBasket: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private basketService: BasketService
  ) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.id).subscribe((product: Product) => {
      this.product = product;

      this.containInBasket = this.basketService.containProduct(this.product);
    });
  }

  addToBasket() {
    this.basketService.addProduct(this.product);
    this.containInBasket = true;
  }

  removeFromBasket() {
    this.basketService.removeProduct(this.product.id);
    this.containInBasket = false;
  }
}
