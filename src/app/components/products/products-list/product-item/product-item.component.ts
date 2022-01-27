import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {Store} from "@ngrx/store";
import {DeleteProductsAction, SelectProductsAction} from "../../../../ngrx/products.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null=null;
  constructor(private store:Store<any>,private router: Router) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.store.dispatch(new SelectProductsAction(product));
  }

  onDelete(product: Product) {
    this.store.dispatch(new DeleteProductsAction(product));
  }

  onEdit(product: Product) {
    this.router.navigateByUrl("/editproduct/"+product.id);
  }
}
