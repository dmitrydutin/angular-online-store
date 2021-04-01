import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss'],
})
export class CatalogSearchComponent implements OnInit {
  public myControl = new FormControl();
  public products: Product[];
  public filteredProducts: Observable<Product[]>;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;

      this.filteredProducts = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  private _filter(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.products.filter((product) => {
      return product.title.toLowerCase().includes(filterValue);
    });
  }

  clickHandler(id: string) {
    this.router.navigate([`product/${id}`]);
  }
}
