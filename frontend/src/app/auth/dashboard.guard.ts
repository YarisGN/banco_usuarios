// home.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Lógica para verificar si el usuario tiene un token
    if (localStorage.getItem('token')) {
      return true; // Permitir el acceso a la ruta "home"
    }

    // Redirigir al usuario a la ruta "login" si no tiene un token
    return this.router.createUrlTree(['/login']);
  }
}
