import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    //subscribe to totalPrice

    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    //subscribe to totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

   /* //When we click on "Cart Icon", CartDetailsComponent gets initialized, but "totalPrice" and "quantity" would have already been published before "CardDetailsComponet" had got initialized. So "computeCartTotal" has to be called again. 
    // this call is required in case of subject
   this.cartService.computeTotals();*/
  }

  //click event when increment button was used on cart details page
  incrementCart(tempCartItem: CartItem) {
    this.cartService.addToCart(tempCartItem);
  }

  //click event when decrement button was used on cart details page
  decrementCart(tempCartItem: CartItem) {
    this.cartService.decrementOrRemoveCart(tempCartItem, false);
  }
  //click event for removing from cart
  RemoveFromCart(tempCartItem: CartItem) {
    this.cartService.decrementOrRemoveCart(tempCartItem, true);
  }
  //Navigate to checkOutComponent
  checkOutPage() {
    this.router.navigateByUrl(`/checkout`);
  }
}
