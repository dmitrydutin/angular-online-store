import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/shared/basket.service';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit {
  @Input() product: Product;
  public containInBasket: boolean;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.containInBasket = this.basketService.containProduct(this.product);
  }

  addToBasket(event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.basketService.addProduct(this.product);
    this.containInBasket = true;
  }

  removeFromBasket(event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.basketService.removeProduct(this.product.id);
    this.containInBasket = false;
  }
}
