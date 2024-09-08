import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';
import { LoaderComponent } from '../loader/loader.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private _products: ProductsService, private _cartService: CartService, private toastr: ToastrService) { }

  allProducts!: Products[]
  searchWord = ""

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._products.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data
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
}
