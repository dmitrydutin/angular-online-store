import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public basket: Product[] = this.getFromLocalStorage() ?? [];

  constructor() {}

  containProduct(product: Product) {
    return this.basket.findIndex((item) => item.id === product.id) !== -1;
  }

  addProduct(product: Product) {
    this.basket.push(product);
    this.saveToLocalStorage();
  }

  removeProduct(id: string) {
    this.basket = this.basket.filter((product) => product.id !== id);
    this.saveToLocalStorage();
  }

  private getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('basket'));
  }

  private saveToLocalStorage() {
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }
}
