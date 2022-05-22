import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';

import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2shopService } from 'src/app/services/luv2shop.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  constructor(private formBuilder: FormBuilder, private luv2ShopSevice: Luv2shopService, private cartService: CartService,private checkoutService:CheckoutService,private router:Router) { }

  ngOnInit(): void {
    //here form group is collection of form groups
    this.checkoutFormGroup = this.formBuilder.group(
      {
        //here form group is collection of controls/elements
        customer: this.formBuilder.group(
          {
            firstName: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
            email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
          }
        ),

        shippingAddress: this.formBuilder.group(
          {
            country: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
            street: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
            zipCode: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace])
          }
        ),

        billingAddress: this.formBuilder.group(
          {
            country: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
            street: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
            zipCode: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace])
          }
        ),


        creditCard: this.formBuilder.group(
          {
            cardType: new FormControl('', [Validators.required]),
            nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
            cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
            securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Luv2ShopValidators.notOnlyWhitespace]),
            expirationMonth: [''],
            expirationYear: ['']
          }
        )


      }
    );

    //populate credit card years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    this.luv2ShopSevice.getCreditCardYears(startYear, endYear).subscribe(
      data => {
        console.log(`credit card years:` + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    //populate months
    const startMonth: number = 1;
    this.luv2ShopSevice.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(`credit card months:` + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    //populate countries

    this.luv2ShopSevice.getCountries().subscribe(
      data => {
        console.log(`countries:` + JSON.stringify(data));
        this.countries = data;
      }
    );

    this.reviewCartTotals();


  }
  //subscribe to total price and total quantity
  reviewCartTotals() {
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);
  }

  //getter methods for customer form controls
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  //getter methods for shippingAddress form controls
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }


  //getter methods for billingAddress form controls
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  //getter methods for billingAddress form controls
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  //this method gets called when purchase is clicked
  onSubmit() {

    console.log("The purchase button is clicked")
    if (this.checkoutFormGroup.invalid) {
      //this line will trigger the validations manually when purchase button is clicked
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    /*console.log(this.checkoutFormGroup.get("customer")?.value);
    console.log(this.checkoutFormGroup.get("customer")?.value.firstName);
    console.log(this.checkoutFormGroup.get("shippingAddress")?.value.country);
    console.log(this.checkoutFormGroup.get("shippingAddress")?.value.state);*/
    
    //setup order
    let order = new Order();
    order.totalPrice=this.totalPrice;
    order.totalQuantity=this.totalQuantity;
    //get cart items
     const cartItems=this.cartService.cartItems;
    //create order items from cart items
      let orderItems:OrderItem[]=cartItems.map(tempCartItem=>new OrderItem(tempCartItem));
    //setup purchase
    let purchase = new Purchase();
    //populate purchase -customer
    purchase.customer=this.checkoutFormGroup.get("customer")?.value;
    //populate purchase -shipping address
    purchase.shippingAddress=this.checkoutFormGroup.get("shippingAddress")?.value;
    const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry:Country=JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state=shippingState.name;
    purchase.shippingAddress.country=shippingCountry.name;
    //populate purchase -billing address
    purchase.billingAddress=this.checkoutFormGroup.get("billingAddress")?.value;
    const billingState:State=JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry:Country=JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state=billingState.name;
    purchase.billingAddress.country=billingCountry.name;
   //populate purchase -order and order items
    purchase.order=order;
    purchase.orderItems=orderItems;
   //call rest api using checkout service
   this.checkoutService.placeOrder(purchase).subscribe(
     {
       next:response=>{
         //alert
         alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        //reset cart
        this.resetCart();
       },
       error:err=>{
        alert(`There was an error: ${err.message}`);
       }
     }
   );
}
  resetCart() {
    //reset cart items,total price,total quantity
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    // go to products page
    this.router.navigateByUrl("/products");
  }
  //method to copy billing address to
  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {

      //bugfix
      this.billingAddressStates = this.shippingAddressStates;

      this.checkoutFormGroup.get('billingAddress').setValue(
        this.checkoutFormGroup.get('shippingAddress').value
      );


    }
    //if checkbox is unchecked 
    else {

      //bugfix
      this.billingAddressStates = [];
      this.checkoutFormGroup.get('billingAddress').reset();

    }

  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    //const formGroup = this.checkoutFormGroup.controls[formGroupName];
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} countryCode ${countryCode}`);
    console.log(`${formGroupName} countryName ${countryName}`);
    this.luv2ShopSevice.getStatesByCountryCode(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );



  }



}
