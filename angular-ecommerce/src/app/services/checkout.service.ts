import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private url:string="http://localhost:8083/api/checkout/purchase";

  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.url, purchase);

  }
}
