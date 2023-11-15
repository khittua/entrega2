import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    if (this.loginWithLocalStorage(username, password)) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // ...

  private loginWithLocalStorage(username: string, password: string): boolean {
    const storedData = localStorage.getItem('userData');

    if (storedData) {
      const userData = JSON.parse(storedData);

      if (username === userData.usuario && password === userData.password) {
        return true;
      }
    }

    return false;
  }
}
