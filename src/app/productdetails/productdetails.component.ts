import { Component } from '@angular/core';
import { Products } from '../products';
import { ProductsService } from '../products.service';
import { response } from 'express';
import { ActivatedRoute } from '@angular/router';
import { pid } from 'process';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { wishedProducts } from '../wishlist';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent {
  constructor(private _productService: ProductsService, private _activatedRoute: ActivatedRoute, private _cartService: CartService, private toastr: ToastrService) { }

  singleProduct!: Products
  userWishList!: wishedProducts[]
  productId: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productId = this._activatedRoute.snapshot.params["pId"]
    this._productService.getSpecificProduct(this.productId).subscribe({
      next: (response: any) => {
        this.singleProduct = response.data
        console.log(this.singleProduct)
      }
    })

    this._productService.getWishList(localStorage.getItem("token")).subscribe({
      next: (response) => {
        this.userWishList = response.data
        console.log(this.userWishList)
      }
    })
  }

  addToCart(id: string) {
    this._cartService.addProductToCart(id, localStorage.getItem('token')).subscribe({
      next: (response) => {
        console.log(response)
        this.toastr.success("Procut added sucessfully", "", {
          timeOut: 2000
        });
      }
    })
  }

  isInWishlist(productId: string): boolean {
    return this.userWishList.some((item: wishedProducts) => item.id === productId);
  }

  addToWishlist(pId: string) {
    this._productService.addToWishlist(localStorage.getItem("token"), pId).subscribe({
      next: (response) => {
        console.log(response)
        this.toastr.success("", "Product added to wishlist :D", {
          timeOut: 2000
        })
      }
    })
  }

  removeFromWishlist(productId: string) {
    this._productService.removeFromWsihlist(localStorage.getItem("token"), productId).subscribe({
      next: (response) => {
        console.log(response)
        this.toastr.success("Product remove from wishlist D:", "", {
          timeOut: 2000
        })
      }
    })
  }
}


