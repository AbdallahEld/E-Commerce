import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category, Products } from '../products';
import { LoaderComponent } from '../loader/loader.component';
import { CategorysliderComponent } from '../categoryslider/categoryslider.component';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { wishedProducts } from '../wishlist';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchPipe, FormsModule, LoaderComponent, CategorysliderComponent, RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  allProducts!: Products[]
  allCategories!: Category[]
  userWishList!: wishedProducts[]
  searchWord = ""


  constructor(private _productService: ProductsService, private _cartService: CartService, private toastr: ToastrService, private _Router: Router) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._productService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data
        console.log(this.allProducts)
      }
    })

    this._productService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data
        console.log(this.allCategories)
      }
    })

    this._productService.getWishList(localStorage.getItem("token")).subscribe({
      next: (response) => {
        this.userWishList = response.data
        console.log(this.userWishList)
      }
    })
  }

  isInWishlist(productId: string): boolean {
    return this.userWishList.some((item: wishedProducts) => item.id === productId);
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

  addToWishlist(pId: string) {
    this._productService.addToWishlist(localStorage.getItem("token"), pId).subscribe({
      next: (response) => {
        console.log(response)
        this.toastr.success("", "Product added to wishlist :D", {
          timeOut: 2000
        })
        this._Router.navigate([this._Router.url])
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
