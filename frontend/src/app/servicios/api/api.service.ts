import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { ListaI } from '../../modelos/lista.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost:4000/api/";

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "auth/login";
    return  this.http.post<ResponseI>(direccion, form);
  }

  getAllClients():Observable<ListaI[]>{
    let direccion = this.url + "http://localhost:4000/api/clients";
    return this.http.get<ListaI[]>(direccion);
  }

}
