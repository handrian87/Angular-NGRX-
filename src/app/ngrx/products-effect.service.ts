import { Injectable } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {
  DeleteProductsActionSuccess,
  GetAllProductsActionError,
  GetAllProductsActionSuccess,
  GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess, NewProductActionSuccess,
  ProductActions,
  ProductsActionsTypes, SaveProductAction, SaveProductActionError, SaveProductActionSuccess,
  SearchProductsAction,
  SearchProductsActionError,
  SearchProductsActionSuccess,
  SelectProductsAction, SelectProductsActionError, SelectProductsActionSuccess
} from "./products.actions";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsEffectService {
  // Injection de notre Service et de l'Actions (from ngrx) dans le constructeur
  constructor(private effectActions: Actions, private productService: ProductService) {}

  // region getAllProductsEffect
  // createEffect() est de type Observable qui reçoit une Action.
  // Il reçoit en paramètre une fonction de type Lamda dans laquelle,
  // on va utiliser un type qu'on va injecter qui s'appelle
  getAllProductsEffect: Observable<ProductActions>= createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      // Quand on fait pipe, on reçoit l'Action.
      // mergeMap: Appel au service qui va envoyer la requête aux back-end
      // une fois que la fonction reçoit l'Action.
      mergeMap(() => {
        return this.productService.getProducts()
          .pipe(
            map((products) => new GetAllProductsActionSuccess(products)),
            // L'erreur suivante c'est quand on appelle la fonction getProducts()
            // et qu'il y a une erreur. Donc dans le cas oû une erreur se produit,
            // on va retourner un Obscervable contenant l'erreur
            catchError((err)=>of(new GetAllProductsActionError(err.message)))
          )
      })
    )
  );
  //endregion

  // region getSelectedProductsEffect
  getSelectedProductsEffect: Observable<ProductActions>= createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap(()=> {
        return this.productService.getSelectedProducts()
          .pipe(
            map((products) => new GetSelectedProductsActionSuccess(products)),
            catchError((err)=>of(new GetSelectedProductsActionError(err.message)))
          )
        }
      )
    )
  );
  //endregion
  // region Search Product
  getSearchProductsEffect: Observable<ProductActions>= createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action: ProductActions)=> {
          return this.productService.searchProducts(action.payload)
            .pipe(
              map((products) => new SearchProductsActionSuccess(products)),
              catchError((err)=>of(new SearchProductsActionError(err.message)))
            )
        }
      )
    )
  );
  //endregion
  // region Select/Unselect Product
  SelectProductsEffect: Observable<ProductActions>= createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCTS),
      mergeMap((action: ProductActions)=> {
          return this.productService.setSelected(action.payload)
            .pipe(
              map((product) => new SelectProductsActionSuccess(product)),
              catchError((err)=>of(new SelectProductsActionError(err.message)))
            )
        }
      )
    )
  );
  // endregion

  // region Delete Product
  DeleteProductsEffect: Observable<ProductActions>= createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.DELETE_PRODUCTS),
      mergeMap((action: ProductActions)=> {
          return this.productService.delete(action.payload.id)
            .pipe(
              // Transmission en paramètre du produit qu'on a supprimé
              map(() => new DeleteProductsActionSuccess(action.payload)),
              catchError((err)=>of(new SelectProductsActionError(err.message)))
            )
        }
      )
    )
  );
  // endregion

  // region New Product
  newProductsEffect: Observable<ProductActions>= createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.NEW_PRODUCT),
      map((action: ProductActions)=> {
          return new NewProductActionSuccess({})
        }
      )
    )
  );
  // endregion
  SaveProductsEffect: Observable<ProductActions>= createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.SAVE_PRODUCT),
      mergeMap((action: ProductActions)=> {
          return this.productService.save(action.payload)
            .pipe(
              // Comme la méthode save retourne un objet de type product,
              // on va mettre product comme paramètre de la méthode map
              map((product) => new SaveProductActionSuccess(product)),
              catchError((err)=>of(new SaveProductActionError(err.message)))
            )
        }
      )
    )
  );
}
