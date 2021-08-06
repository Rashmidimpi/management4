import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApihandlerService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, public router: Router) { }

  loginrequest(data : any) : Observable<any>{
    return this.http.get(this.API_URL + "admin?email="+data.email+"&password="+data.password);
  }

  postrequest(url: any, data: any): Observable<any>{
    return this.http.post(this.API_URL + url, data);
  }

  post(url: any, id: any): Observable<any>{
    return this.http.post(this.API_URL + url, id);
  }

  getrequest(url: any): Observable<any>{
    return this.http.get(this.API_URL + url);
  }

  deleterequest(url: any, id: any){
    return this.http.delete(this.API_URL+url+id);
  }

  updaterequest(url: any, id:any, updatedata: any){

    let data = {
      "id": id,
      "product_name": updatedata.product_name,
      "seller": updatedata.seller,
      "description": updatedata.description,
      "price": updatedata.price,

    }
    return this.http.put(this.API_URL+url+id,data)
  }
}
