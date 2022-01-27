import {Action} from "@ngrx/store";
import {Product} from "../model/product.model";

export enum ProductsActionsTypes {
  //region Product action type
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
  SELECT_PRODUCTS_ERROR = "[Products] Select products Error",
  /* DELETE PRODUCT */
  DELETE_PRODUCTS ="[Product] Delete products",
  DELETE_PRODUCTS_SUCCESS = "[Products] Delete products Success",
  DELETE_PRODUCTS_ERROR = "[Products] Delete products Error",

  /* NEW PRODUCT */
  NEW_PRODUCT ="[Product] New products",
  NEW_PRODUCT_SUCCESS = "[Products] New products Success",
  NEW_PRODUCT_ERROR = "[Products] New products Error",
  //endregion
  /* SAVE PRODUCT */
  SAVE_PRODUCT ="[Product] Save products",
  SAVE_PRODUCT_SUCCESS = "[Products] Save products Success",
  SAVE_PRODUCT_ERROR = "[Products] Save products Error"
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
  SearchProductsActionError | SelectProductsAction | SelectProductsActionSuccess | SelectProductsActionError |
  DeleteProductsAction | DeleteProductsActionSuccess | DeleteProductsActionError | NewProductAction |
  NewProductActionSuccess | NewProductActionError | SaveProductAction | SaveProductActionSuccess | SaveProductActionError;

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

// DELETE Product
//region DELETE Product
export class DeleteProductsAction implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.DELETE_PRODUCTS;
  constructor(public payload:Product) {
  }
}

export class DeleteProductsActionSuccess implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.DELETE_PRODUCTS_SUCCESS;
  constructor(public payload:Product) {
  }
}

export class DeleteProductsActionError implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.DELETE_PRODUCTS_ERROR;
  constructor(public payload:string) {
  }
}
//endregion

// NEW PRODUCT
//region NEW PRODUCT
export class NewProductAction implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.NEW_PRODUCT;
  constructor(public payload:any) {
  }
}

export class NewProductActionSuccess implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.NEW_PRODUCT_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewProductActionError implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.NEW_PRODUCT_ERROR;
  constructor(public payload:string) {
  }
}
//endregion

// SAVE PRODUCT
//region SAVE PRODUCT
export class SaveProductAction implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SAVE_PRODUCT;
  constructor(public payload:Product) {
  }
}

export class SaveProductActionSuccess implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SAVE_PRODUCT_SUCCESS;
  constructor(public payload:Product) {
  }
}

export class SaveProductActionError implements Action {
  type: ProductsActionsTypes = ProductsActionsTypes.SAVE_PRODUCT_ERROR;
  constructor(public payload:string) {
  }
}
//endregion
