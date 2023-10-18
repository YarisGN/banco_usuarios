import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Login } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _usersService: UsersService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }

  login() {
    if (this.usuario === undefined || this.password === undefined) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
  
    const user: Login = {
      usuario: this.usuario,
      password: this.password,
    };
  
    this.loading = true;
    this._usersService.login(user).subscribe(
      (data: any) => {
        if (data.body && data.body.startsWith('eyJ')) { // Comprobar si es un token válido
          const token = data.body;
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        } else if (data.body === 'Usuario no encontrado.') {
          this.toastr.error('Usuario no encontrado', 'Error');
          
        } else if (data.body === 'Contraseña incorrecta') {
          this.toastr.error('Contraseña incorrecta', 'Error');
        } else {
          this.toastr.error('Respuesta inesperada', 'Error');
        }
        this.loading = false;
      },
      (e: HttpErrorResponse) => {
        this.msjError(e);
        this.loading = false;
      }
    );
  }
  

  msjError(e: HttpErrorResponse) {
    if (e.error.message) {
      this.toastr.error(e.error.message, 'Error');
    } else {
      this.toastr.error('Ha ocurrido un error, comuníquese con el administrador.', 'Error');
    }
  }


}
