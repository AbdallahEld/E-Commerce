import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList: Products[], searchValue: string): Products[] {
    return productList.filter(product => product.title.includes(searchValue))
  }

}
