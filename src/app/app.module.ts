import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductsComponent } from './components/products/products.component';
import { ProductsNavBarComponent } from './components/products/products-nav-bar/products-nav-bar.component';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {StoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import {productsReducer} from "./ngrx/products.reducer";
import {ProductsEffectService} from "./ngrx/products-effect.service";
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductItemComponent } from './components/products/products-list/product-item/product-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsNavBarComponent,
    ProductsListComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({catalogueStore:productsReducer}), // objet STORE dans lequel on va spécifier le reducer (dans forRoot)
    EffectsModule.forRoot([ProductsEffectService]), // tableau dans lequel on va spécifier les effects (dans forRoot)
    StoreDevtoolsModule.instrument(), // au démarrage, à chaque fois qu'il ya quelque chose qui passe
                                     // dans NGRX, il va notifier le pluggin de google chrome qui permet
                                     // redux (ngrx-angular) de voir ce qui se passe dans le State de l'appli
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
