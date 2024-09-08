import { pid } from 'process';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }

  addProductToCart(pId: string, userToken: any): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart",
      { "productId": pId }, {
      headers: {
        token: userToken
      }
    })
  }

  getCart(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart")
  }

  updateProductCount(productCount: number, userToken: any, productId: string): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: productCount }, {
      headers: {
        token: userToken
      }
    })
  }

  removeCartItem(userToken: any, productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: {
        token: userToken
      }
    })
  }

  checkOutSession(userToken: any, cartId: string, adress: any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAdress: adress
    },
      {
        headers: {
          token: userToken
        }
      })
  }
}
