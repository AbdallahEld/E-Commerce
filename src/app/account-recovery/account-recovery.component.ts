import { Component } from '@angular/core';
import { AuthonService } from '../authon.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-account-recovery',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-recovery.component.html',
  styleUrl: './account-recovery.component.scss'
})
export class AccountRecoveryComponent {

  constructor(private _authon: AuthonService, private _Router: Router) { }

  emailForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ])
  })

  sendResetCode(form: any) {
    if (form.valid) {
      const email = form.value.email
      this._authon.resetCode(email).subscribe({
        next: (response) => {
          console.log(response)
          this._Router.navigate(["/reset"])
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}
