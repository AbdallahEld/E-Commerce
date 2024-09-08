import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category } from '../products';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private _product: ProductsService) { }

  allCategories!: Category[]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._product.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data
        console.log(this.allCategories)
      }
    })
  }
}
