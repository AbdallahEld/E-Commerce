import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthonService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private _HttpClient: HttpClient) {
    afterNextRender(() => {
      if (localStorage.getItem('token') != null) {
        this.isLogin.next(true)
      } else {
        this.isLogin.next(false)
      }
    })
  }

  signUp(userData: User): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData)
  }

  signIn(loginData: any): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", loginData)
  }

  resetCode(userData: string): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email: userData })
  }

  recoverCode(userData: string): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
      resetCode: userData
    })
  }

  resetYourPassword(userEmail: string, userPassword: string): Observable<any> {
    return this._HttpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
      email: userEmail,
      newPassword: userPassword
    });
  }
}
