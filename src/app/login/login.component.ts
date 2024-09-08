import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthonService } from '../authon.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthonService: AuthonService, private _Router: Router) { }

  loading = false

  backendMsg = null

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ]),
  })

  login(form: any) {
    if (form.valid) {
      this.loading = true
      this._AuthonService.signIn(form.value).subscribe({
        next: (response) => {
          console.log(response)
          console.log(response.token)
          localStorage.setItem('token', response.token)
          this._Router.navigate(["/home"])
          this.loading = false
          this._AuthonService.isLogin.next(true)
        },
        error: (err) => {
          console.log(err)
          this.backendMsg = err.error.message
          this.loading = false
        }
      })
    }

  }

  accountRecovery() {
    this._Router.navigate(["/recoverEmail"])
  }
}

