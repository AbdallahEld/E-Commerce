import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { guardRoutesGuard } from './guard-routes.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ShippingadressComponent } from './shippingadress/shippingadress.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { ResetCodeComponent } from './reset-code/reset-code.component';
import { RecoverEmailComponent } from './recover-email/recover-email.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
    { path: "", redirectTo: "/register", pathMatch: "full" },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },



    { path: "cart", component: CartComponent, canActivate: [guardRoutesGuard] },
    { path: "brands", component: BrandsComponent, canActivate: [guardRoutesGuard] },
    { path: "categories", component: CategoriesComponent, canActivate: [guardRoutesGuard] },
    { path: "products", component: ProductsComponent, canActivate: [guardRoutesGuard] },
    { path: "home", component: HomeComponent, canActivate: [guardRoutesGuard] },
    { path: "productDetails/:pId", component: ProductdetailsComponent, canActivate: [guardRoutesGuard] },
    { path: "shipping/:cartId", component: ShippingadressComponent, canActivate: [guardRoutesGuard] },
    { path: "recoverEmail", component: AccountRecoveryComponent },
    { path: "reset", component: ResetCodeComponent },
    { path: "recoverform", component: RecoverEmailComponent },
    { path: "wishlist", component: WishlistComponent, canActivate: [guardRoutesGuard] },

    { path: "**", component: NotfoundComponent }
];
