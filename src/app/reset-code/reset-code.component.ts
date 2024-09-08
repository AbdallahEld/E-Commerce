import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthonService } from '../authon.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {
  constructor(private _authon: AuthonService, private _Router: Router) { }

  codeForm = new FormGroup({
    resetCode: new FormControl()
  })

  recoverCode(form: any) {
    if (form.valid) {
      const resetCode = form.value.resetCode
      this._authon.recoverCode(resetCode).subscribe({
        next: (response) => {
          console.log(response)
          this._Router.navigate(["recoverform"])
        },
        error: (error) => {
          console.log(error)
        }
      })
    }

  }
}
