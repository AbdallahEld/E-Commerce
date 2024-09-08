
import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { Brand } from '../products';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private _products: ProductsService) { }

  allBrands !: Brand[]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._products.getAllBrands().subscribe({
      next: (response) => {
        this.allBrands = response.data
        console.log(this.allBrands)
      }
    })
  }
}
