import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  
constructor(private service:ProductCategoryService) { }

  ngOnInit(): void {

    this.listProductCategory();
  }
  listProductCategory() {
   this.service.getProductCategory().subscribe(
     data=>{
       console.log('product categories'+JSON.stringify(data));
       this.productCategories=data;
      }
   );


  }

}
 

