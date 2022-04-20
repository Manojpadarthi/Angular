import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  
  baseUrl:string="http://localhost:8083/api/product-category";
  constructor(private httpClient:HttpClient) { }
  
  
  
  getProductCategory():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.baseUrl).pipe(
      map(response => response._embedded.productCategory)
    );
     
  }

  
  


}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }

}
