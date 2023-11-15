import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class WardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // El usuario está autenticado y puede acceder a la ruta.
    } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión.
      this.router.navigate(['/login']);
      return false;
    }
  }
}