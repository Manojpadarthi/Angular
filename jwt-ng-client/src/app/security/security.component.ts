import { Component, OnInit } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
 

   authRequest:any={
    "userName":"manoj",
"password":"Hyderabad@143",
 "email":"padarthi30@gmail.com"
 
 }

 response:any;
  constructor(private service:JwtClientService) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
  }

  public getAccessToken(authRequest:any){
     this.service.generateToken(authRequest).subscribe(
       data=>this.callEmployee(data)
     )
  }
  public callEmployee(token: string){
   this.service.getEmployeeById(token).subscribe(
     data=>this.response=data
   )
  }

}
