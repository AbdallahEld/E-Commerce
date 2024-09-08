import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shippingadress',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shippingadress.component.html',
  styleUrl: './shippingadress.component.scss'
})
export class ShippingadressComponent {
  constructor(private _ActivatedRoute: ActivatedRoute, private _cartService: CartService) { }

  cartId!: string

  shippingAdress = new FormGroup({
    details: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartId = this._ActivatedRoute.snapshot.params["cartId"]
    console.log(this.cartId)
  }

  onlinePayment(form: any) {
    if (form.valid) {
      this._cartService.checkOutSession(localStorage.getItem("token"), this.cartId, form.value).subscribe({
        next: (response) => {
          console.log(response)
          location.href = response.session.url
        }
      })
    }
  }
}
