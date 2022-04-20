import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient:HttpClient) { }

  public generateToken(request:any){
    return this.httpClient.post("http://localhost:8082/authenticate",request,{responseType:'string' as 'json'});
  }

  /*public getWelcome(token:string){
    let strToken:string = 'Bearer '+ token ;
    const headerss = new HttpHeaders();

    headerss.set("Authorization",strToken);
    return this.httpClient.get("http://localhost:8082/",{headers:headerss,responseType:'string' as 'json'});
  }*/
  
  public getEmployeeById(token:string){
    let strToken:string = 'Bearer '+ token ;
    const headerss = new HttpHeaders();

    headerss.set("Authorization",strToken);
    return this.httpClient.get("http://localhost:8082/employees/retrieve/1",{headers:headerss,responseType:'string' as 'json'});
  }

}
