import { Component } from '@angular/core';
import { AuthonService } from '../authon.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-recover-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recover-email.component.html',
  styleUrl: './recover-email.component.scss'
})
export class RecoverEmailComponent {
  constructor(private _authon: AuthonService, private _Router: Router) { }

  recoverForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),

    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ]),
  })

  recoverEmail(form: any) {
    if (form.valid) {
      const email = form.value.email
      const newPassword = form.value.newPassword
      this._authon.resetYourPassword(email, newPassword).subscribe({
        next: (response) => {
          localStorage.setItem("token", response.token)
          console.log("success")
          this._authon.isLogin.next(true)
          this._Router.navigate(["/home"])
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}
