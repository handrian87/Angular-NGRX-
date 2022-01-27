import {Product} from "../model/product.model";
import {ProductActions, ProductsActionsTypes} from "./products.actions";
import {Action} from "@ngrx/store";

export enum ProductsStateEnum {
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT"
}

export interface ProductsState {
  // Liste des produits
  products: Product[],
  // Variable pour la gestion des états (state)
  errorMessage: string,
  dataState: ProductsStateEnum
}

// Il est important de donner une valeur initiale au State
const initState: ProductsState = {
  products: [],
  errorMessage: "",
  dataState: ProductsStateEnum.INITIAL
}

// CRÉATION DU REDUCER.
// 1er PARAMÈTRE: "STATE actuel"
// Il est important de donner une valeur initiale au State.
// Dès le démarrage de l'application, le STORE automatiquement fait appel
// au REDUCER, et il lui transmets le STATE, mais
// comme il n'y a pas encore de STATE, puisque ce dernier n'est pas encore créée,
// il va lui transmettre la valeur par défaut qui est initState.
// 2ème PARAMÈTRE: "ACTION produite et dispatchée dans le STORE"
// Nos Actions peuvent être l'un des types suivants:
// GetAllProductsAction | GetAllProductsActionSuccess | GetAllProductsActionError
// Le REDUCER va retourner un nouveau ProductsState.
export function productsReducer(state:ProductsState = initState, action: Action): ProductsState {
// Donc le REDUCER va recevoir du STORE un STATE et une ACTION
  switch (action.type){
    // region Case for All Product
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      // Le REDUCER recoit le STATE actuel et l'action et il va retourner le nouveau STATE
      // On va retourner un objet contenant tous les attributs du STATE: c'est une copie du state
      // actuel dans un nouvel objet : {...state}. En ajoutant un virgule après "...state", on modifie
      // la copie de l'objet contenant le state.(Dans notre cas, on modifie le dataState.)
      // Le conde suivant signifie que dès qu'on reçoit l'action
      // "ProductsActionsTypes.GET_ALL_PRODUCTS", on indique déjà dans le state comme quoi les données sont
      // en cours de chargement : "dataState: ProductsStateEnum.LOADING", sachant que l'action va encore être
      // traitée par EFFECT.
      return {...state, dataState: ProductsStateEnum.LOADING}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      // C'est l'EFFECT qui va générer cette action : "ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS".
      // Dans EFFECT, quand il va récupérer les données dans la partie BACK-END, il va placer
      // la liste des produits dans PAYLOAD de l'ACTION.
      return {...state, dataState: ProductsStateEnum.LOADED, products:(<ProductActions>action).payload}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage: (<ProductActions>action).payload}
    //endregion
    // region Selected product
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED, products:(<ProductActions>action).payload}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage:(<ProductActions>action).payload}
    // endregion
    // region Search product
    case ProductsActionsTypes.SEARCH_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING}
    case ProductsActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED, products:(<ProductActions>action).payload}
    case ProductsActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductActions>action).payload}
    //endregion
    // region Selected product
    case ProductsActionsTypes.SELECT_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING}
    case ProductsActionsTypes.SELECT_PRODUCTS_SUCCESS:
      // Récupération du produit qui a été modifié:
        let product: Product=(<ProductActions>action).payload;
      // Récupération d'une copie de la liste des produits à partir du State:
        let listProducts = [...state.products];
      // Modification/Actualisation de la liste des produits, pour obtenir une nouvelle liste
        let data:Product[] = listProducts.map(p=>p.id==product.id? product:p)
      return {...state, dataState: ProductsStateEnum.LOADED, products: data}
    case ProductsActionsTypes.SELECT_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductActions>action).payload}
    // endregion
    //region Delete product
    case ProductsActionsTypes.DELETE_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING}
    case ProductsActionsTypes.DELETE_PRODUCTS_SUCCESS:
      let p: Product=(<ProductActions>action).payload;
      let index=state.products.indexOf(p);
      let listProduct = [...state.products];
      listProduct.splice(index,1)
      return {...state, dataState: ProductsStateEnum.LOADED, products: listProduct}
    case ProductsActionsTypes.DELETE_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductActions>action).payload}
    //endregion
    //region New product
    case ProductsActionsTypes.NEW_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING}
    case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
      return {...state, dataState: ProductsStateEnum.NEW}
    case ProductsActionsTypes.NEW_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductActions>action).payload}
    //endregion
    //region Save product
    case ProductsActionsTypes.SAVE_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING}
    case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
      let prods: Product[]=[...state.products];
      // Ajouter le prduit ajouter dans la liste. Le nouveau produit se trouve dans
      // (<ProductActions>action).payload
      prods.push((<ProductActions>action).payload)
      return {...state, dataState: ProductsStateEnum.LOADED, products: prods}
    case ProductsActionsTypes.SAVE_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductActions>action).payload}
    //endregion
    default: return {...state}
  }
}

