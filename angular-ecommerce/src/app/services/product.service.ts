import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl:string ="http://localhost:8083/api/products";
  
  constructor(private httpClient: HttpClient) { 

  }

  getProductList(url:string): Observable<Product[]>{
      
    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map(response=>response._embedded.products)
    );
  }

  //this method is used for product detail page
  getProduct(productId:number): Observable<Product>{
    const productUrl=`${this.baseUrl}/${productId}`;
  return this.httpClient.get<Product>(productUrl);
}
  
  getProductListByCategory(categoryId:number): Observable<Product[]>{
     const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

     return this.getProductList(searchUrl);
  }

  getProductListByKeyword(keyword:string): Observable<Product[]>{
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?keyword=${keyword}`;

   return this.getProductList(searchUrl);

  }

  

  

 //this method is used for pagination for search by category id
 getProductListByCategoryIdPaginate(thePage:number,thePageSize:number,categoryId:number): Observable<GetResponseProducts>{
  const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
  +`&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);
  
}

//this method is used for pagination for search by keyword
getProductListByKeywordPaginate(thePage:number,thePageSize:number,keyword:string): Observable<GetResponseProducts>{
  const searchUrl =`${this.baseUrl}/search/findByNameContaining?keyword=${keyword}`
  +`&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);

}



}

interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size : number,
    totalElements : number,
    totalPages : number,
    number : number

  }
}

