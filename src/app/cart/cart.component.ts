import { ProductsService } from './../products.service';

import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CartDetails, CartProducts } from '../cart';
import { Router, RouterLink } from '@angular/router';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(private _Router: Router, private _cartService: CartService, private _productService: ProductsService, private _toastr: ToastrService) { }

  CartProducts!: CartProducts[]
  CartDetails!: CartDetails

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._cartService.getCart().subscribe({
      next: (response) => {
        this.CartDetails = response
        this.CartProducts = response.data.products
      }
    })
  }

  updateProductCount(Id: string, count: number) {
    this._cartService.updateProductCount(count, localStorage.getItem("token"), Id).subscribe({
      next: (response) => {
        console.log(response)
        this.CartDetails = response
        this.CartProducts = response.data.products
      }
    })
  }

  removeCartItem(id: string) {
    this._cartService.removeCartItem(localStorage.getItem("token"), id).subscribe({
      next: (response) => {
        console.log(response)
        this._cartService.getCart().subscribe({
          next: (response) => {
            this.CartDetails = response
            this.CartProducts = response.data.products
          }
        })
      }
    })
  }

  clearCart() {
    this._productService.clearCart(localStorage.getItem("token")).subscribe({
      next: (response) => {
        console.log(response)
        this._Router.navigate(["/home"])
        this._toastr.info("cart empty", "", {
          timeOut: 2000
        })
      }
    })
  }
}
