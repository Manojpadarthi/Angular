import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  salesPersons : SalesPerson[]=[

    new SalesPerson("manoj","Padarthi","Padarthi30@gmail.com",4000),
    new SalesPerson("Ramu","Yashu","Ramu30@gmail.com",5000),
    new SalesPerson("Viru","Sehwag","Viru30@gmail.com",6000)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
