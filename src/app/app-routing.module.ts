import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {NewProductComponent} from "./components/products/new-product/new-product.component";

const routes: Routes = [
  { path: "products", component: ProductsComponent},
  { path: "newproduct", component: NewProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
