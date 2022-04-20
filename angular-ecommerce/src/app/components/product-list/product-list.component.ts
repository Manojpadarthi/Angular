import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 0;
  previousCategoryId: number = 0;
  currentCategoryName: string = "";
  searchMode: boolean = true;


  //pagination properties
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;


  constructor(private productService: ProductService, private route: ActivatedRoute,private cartService :CartService) {


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => { this.listProducts(); }

    );
  }




  //common method which calls  method for category id or method for keyword
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleListProductsByKeyword();
    }

    else {
      this.handleListProductsByCategory();
    }


  }


  //search by category id
  handleListProductsByCategory() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //check if "id" parameter is available
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      //check if "id" parameter is available if not default to 1
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books"
    }
    //check if previous category id is different than current category id
    //Angular will reuse the component if it is being currently viewed
    // if we have different category id than previous then set the pagenumber to 1
    if (this.previousCategoryId != this.currentCategoryId) {

      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListByCategoryIdPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
      this.processResult());

  }
  

  //search by keyword
  handleListProductsByKeyword() {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;
    
    //check if previous category id is different than current category id
    //Angular will reuse the component if it is being currently viewed
    // if we have different category id than previous then set the pagenumber to 1
    if (this.previousCategoryId != this.currentCategoryId) {

      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    this.productService.getProductListByKeywordPaginate(this.thePageNumber-1,this.thePageSize,keyword).subscribe(
      this.processResult());
  }
  
  processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }


  updatePageSize(pageSize:number){
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProducts();

  }

  addToCart(product:Product){
    let cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem)
   
  }

}
