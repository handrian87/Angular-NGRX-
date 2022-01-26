import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {ProductsState, ProductsStateEnum} from "../../ngrx/products.reducer";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsState$: Observable<ProductsState> | null = null;
  readonly DataStateEnum= ProductsStateEnum;
  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    // Dès le démarrage:
    // On va écouter ce qui se passe dans le store avec pipe().
    // Quand on reçoit des données (state), on va faire un map
    this.productsState$=this.store.pipe(
      map((state)=> state.catalogueStore)
    );
  }
}
