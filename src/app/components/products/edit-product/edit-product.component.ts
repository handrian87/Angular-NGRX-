import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsState, ProductsStateEnum} from "../../../ngrx/products.reducer";
import {Store} from "@ngrx/store";
import {EditProductAction} from "../../../ngrx/products.actions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productFormGroup= new FormGroup({});
  state: ProductsState | null=null;
  readonly StateEnum= ProductsStateEnum;
  productID: number;
  formBuilt: boolean=false;
  submitted: boolean=false;
  constructor(private store: Store<any>, private fb:FormBuilder, private activatedRoute:ActivatedRoute) {
    // récupération de l'id du produit à partir de la route:
    this.productID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(new EditProductAction(this.productID));
    this.store.subscribe(state => {
      this.state=state.catalogueStore;
      // Méthode 1) Statique
      if(this.state?.dataState == ProductsStateEnum.LOADED){
        if(this.state.currentProduct!=null){
          this.productFormGroup=this.fb.group({
            id:[this.state.currentProduct.id],
            name: [this.state.currentProduct.name, Validators.required],
            price: [this.state.currentProduct.price, Validators.required],
            quantity: [this.state.currentProduct.quantity, Validators.required],
            selected: [this.state.currentProduct.selected],
            available: [this.state.currentProduct.available]
          });
          //this.formBuilt=true;
        }
      }
      // Méthode 2) Dynamique
      /*
        if(this.state?.dataState == ProductsStateEnum.EDIT){
          this.productFormGroup=this.fb.group({});
          let data=this.state?.currentProduct;
          for(let f in data){
            this.productFormGroup?.addControl(f,new FormControl(data[f], Validators.required)
          }
          this.formBuilt=true;
        }
      */
    })
  }



  okUpdated() {

  }

  onUpdateProduct() {
    this.submitted = true;
    if(this.productFormGroup.invalid) return;
  }
}
