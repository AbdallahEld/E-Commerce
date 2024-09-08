import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  getSpecificProduct(x: any): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products/" + x)
  }

  getAllBrands(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  getWishList(userToken: any): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: userToken
      }
    })
  }

  addToWishlist(userToken: any, productId: string): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: productId }, {
      headers: {
        token: userToken
      }
    }
    )
  }

  removeFromWsihlist(userToken: any, productId: string): Observable<any> {
    return this._HttpClient.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
      headers: {
        token: userToken
      }
    })
  }

  clearCart(userToken: any): Observable<any> {
    return this._HttpClient.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: userToken
      }
    })
  }
}
