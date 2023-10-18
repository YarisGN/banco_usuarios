import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { registrarUsuarios } from '../interface/users';
import { Login } from '../interface/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint: string = env.endPoint;
  private apiUrl:string = this.endpoint + "api/";


  constructor(private http:HttpClient) { }
  
  obtenerUsuarios():Observable<registrarUsuarios[]>{
    return this.http.get<registrarUsuarios[]>(`${this.apiUrl}clients`);
  }

  obtenerUno(idUser:number):Observable<registrarUsuarios>{
    return this.http.get<registrarUsuarios>(`${this.apiUrl}clients/${idUser}`);
  }

  agregarUsusario(model:registrarUsuarios):Observable<registrarUsuarios>{
    return this.http.post<registrarUsuarios>(`${this.apiUrl}clients`, model);
  }

  actualizarUsusario(idUser:number, model:registrarUsuarios):Observable<registrarUsuarios>{
    return this.http.put<registrarUsuarios>(`${this.apiUrl}clients/${idUser}`, model);
  }

  eliminarUsuario(idUser:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}clients/${idUser}`);
  }

  login(model:Login):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}auth/login`, model);
  }
}
