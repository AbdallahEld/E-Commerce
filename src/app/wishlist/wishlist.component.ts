import { wishedProducts } from './../wishlist';
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  constructor(private _products: ProductsService, private _cart: CartService) { }

  allWishedProducts!: wishedProducts[]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._products.getWishList(localStorage.getItem("token")).subscribe({
      next: (response) => {
        this.allWishedProducts = response.data
        console.log(this.allWishedProducts)
      }
    })
  }

  addToCart(pId: string) {
    this._cart.addProductToCart(pId, localStorage.getItem("token")).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  removeFromWishlist(productId: string) {
    this._products.removeFromWsihlist(localStorage.getItem("token"), productId).subscribe({
      next: (response) => {
        this.allWishedProducts = response.data
        console.log(response)
      }
    })
  }
}
