import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsState, ProductsStateEnum} from "../../../ngrx/products.reducer";
import {Store} from "@ngrx/store";
import {NewProductAction, SaveProductAction} from "../../../ngrx/products.actions";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup = new FormGroup({});
  state: ProductsState | null=null;
  readonly StateEnum= ProductsStateEnum;
  submitted: boolean=false;

  constructor(private store: Store<any>, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(new NewProductAction({}));
    // S'inscrire au State
    this.store.subscribe(state => {
      this.state=state.catalogueStore;
      // Dés que les données sont chargées, c'est à ce moment là qu'on
      // construit le formulaire:
      if(this.state?.dataState == ProductsStateEnum.NEW){
        this.productFormGroup=this.fb.group({
          name: new FormControl("", Validators.required),
          price: new FormControl(0, Validators.required),
          quantity: new FormControl(0, Validators.required),
          selected: new FormControl(true, Validators.required)
        });
      }
    })
  }

  get f(): {[key: string]: AbstractControl}{
    return this.productFormGroup.controls;
  }

  newProduct() {
    this.store.dispatch(new NewProductAction({}));
  }

  onSaveProduct() {
    // Transmission du produit au constructeur SaveProductAction.
    // Le produit se trouve dans this.productFormGroup.value
    this.store.dispatch(new SaveProductAction(this.productFormGroup.value));
  }
}
