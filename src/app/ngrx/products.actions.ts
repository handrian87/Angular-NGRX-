import {Action} from "@ngrx/store";
import {Product} from "../model/product.model";

export enum ProductsActionsTypes {
  /* GET ALL PRODUCT */
  GET_ALL_PRODUCTS ="[Products] Get All products",
  GET_ALL_PRODUCTS_SUCCESS = "[Products] Get All products Success",
  GET_ALL_PRODUCTS_ERROR = "[Products] Get All products Error",
  /* GET SELECTED PRODUCT */
  GET_SELECTED_PRODUCTS ="[Products] Get Selected products",
  GET_SELECTED_PRODUCTS_SUCCESS = "[Products] Get Selected products Success",
  GET_SELECTED_PRODUCTS_ERROR = "[Products] Get Selected products Error",
  /* SEARCH PRODUCT */
  SEARCH_PRODUCTS ="[Products] Get Search products",
  SEARCH_PRODUCTS_SUCCESS = "[Products] Get Search products Success",
  SEARCH_PRODUCTS_ERROR = "[Products] Get Search products Error",
  /* SELECT PRODUCT */
  SELECT_PRODUCTS ="[Product] Select products",
  SELECT_PRODUCTS_SUCCESS = "[Products] Select products Success",
  SELECT_PRODUCTS_ERROR = "[Products] Select products Error"
}

// CRÉATION DES ACTIONS:
// region GETALLPRODUCTS
// Les actions dans NGRX sont des class qui vont implémenter
// une interface fournie par NGRX même et qui s'appelle ACTION.
// 1) Action pour Get All products:
export class GetAllProductsAction implements Action {
  // Comme une action est définie par 2 attributs: type et payload:
  type: ProductsActionsTypes = ProductsActionsTypes.GET_ALL_PRODUCTS;

  // Pour ajouter le payload, de préférences le faire dans le constructeur.
  constructor(public payload:any) {
  }
}

// 2) Action pour Get All products Success
export class GetAllProductsActionSuccess implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS;
  constructor(public payload:Product[]) {
  }
}

// 3) Action pour Get All products Error
export class GetAllProductsActionError implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR;
  // Dans ce cas le payload est de type string car quand on créé l'action qui génère
  // l'erreur, on doit lui transmettre un string contenant le message d'erreur.
  constructor(public payload:string) {
  }
}
// endregion
// Dans le suivant le type ProductActions peut être l'un des 3 cas:
export type ProductActions = GetAllProductsAction | GetAllProductsActionSuccess |
  GetAllProductsActionError | GetSelectedProductsAction | GetSelectedProductsActionSuccess |
  GetSelectedProductsActionError | SearchProductsAction | SearchProductsActionSuccess |
  SearchProductsActionError | SelectProductsAction | SelectProductsActionSuccess | SelectProductsActionError;

/* SELECTED PRODUCT */
//region Selected Product
export class GetSelectedProductsAction implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.GET_SELECTED_PRODUCTS;
  constructor(public payload:any) {
  }
}

export class GetSelectedProductsActionSuccess implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS;
  constructor(public payload:Product[]) {
  }
}

export class GetSelectedProductsActionError implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR;
  constructor(public payload:string) {
  }
}
//endregion
/* SEARCH PRODUCT */
//region Search PRODUCT
export class SearchProductsAction implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SEARCH_PRODUCTS;
  constructor(public payload:string) {
  }
}

export class SearchProductsActionSuccess implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SEARCH_PRODUCTS_SUCCESS;
  constructor(public payload:Product[]) {
  }
}

export class SearchProductsActionError implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SEARCH_PRODUCTS_ERROR;
  constructor(public payload:string) {
  }
}
//endregion

//SELECT/UNSELECT Product
//region select/unselect
export class SelectProductsAction implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SELECT_PRODUCTS;
  constructor(public payload:Product) {
  }
}

export class SelectProductsActionSuccess implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SELECT_PRODUCTS_SUCCESS;
  constructor(public payload:Product) {
  }
}

export class SelectProductsActionError implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SELECT_PRODUCTS_ERROR;
  constructor(public payload:string) {
  }
}
//endregion
