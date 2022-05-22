import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  //subjects
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  // service method to add to cart
  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;

    let existingCartItem!: CartItem;
    if (this.cartItems.length > 0) {
      for (let cartItem of this.cartItems) {
        if (cartItem.id === theCartItem.id) {
          existingCartItem = cartItem;
          break;
        }
      }
      //existingCartItem= this.cartItems.find(tempCartItem=>tempCartItem.id==theCartItem.id);
      // check and return the boolean-true if already found 
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);

    }


    this.computeTotals();
  }


  // service method to remove from cart
  decrementOrRemoveCart(theCartItem: CartItem, remove: boolean) {
    let alreadyExistsInCart: boolean = false;

    let existingCartItem!: CartItem;
    if (this.cartItems.length > 0) {
      for (let cartItem of this.cartItems) {
        if (cartItem.id === theCartItem.id) {
          existingCartItem = cartItem;
          break;
        }
      }
      //existingCartItem= this.cartItems.find(tempCartItem=>tempCartItem.id==theCartItem.id);
      // check and return the boolean-true if already found 
      alreadyExistsInCart = (existingCartItem != undefined);

    }
    //decrement
    if (alreadyExistsInCart && existingCartItem.quantity > 0 && !remove) {
      existingCartItem.quantity--;
    }
    //remove
    else if (alreadyExistsInCart && existingCartItem.quantity >= 0 && remove) {
      const cartIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
      if (cartIndex > -1) {
        this.cartItems.splice(cartIndex, 1);
      }
    }


    this.computeTotals();
  }

  //service method to compute Totals
  computeTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values ....all  subscribers will receive the new data
    this.totalPrice.next(+totalPriceValue.toFixed(2));
    this.totalQuantity.next(totalQuantityValue);

    this.consoleLog(totalPriceValue, totalQuantityValue);
  }

  //method to log to console
  consoleLog(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`-------------`)
    console.log(`Cart Item Details:`);
    for (let cartItem of this.cartItems) {
      const subTotal = cartItem.quantity * cartItem.unitPrice;

      console.log(`subtotal:${subTotal},cartItemName:${cartItem.name},cartItemQuantity:${cartItem.quantity},cartItemUnitPrice:${cartItem.unitPrice}`);
    }
    //toFixed to round of decimals to two places
    console.log(`toatal Cart Items : price=${totalPriceValue.toFixed(2)} : quantity=${totalQuantityValue}`);
    console.log(`-------------`);
  }



}
