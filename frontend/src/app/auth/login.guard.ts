// login.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Lógica para verificar si el usuario NO tiene un token
    if (!localStorage.getItem('token')) {
      return true; // Permitir el acceso a la ruta "login"
    }

    // Redirigir al usuario a la ruta "home" si ya tiene un token
    return this.router.createUrlTree(['/dashboard']);
  }
}
