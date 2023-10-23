import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario: string = ''; 
  password: string = '';
  constructor(private storage: Storage) {
    
    this.initStorage();
  }
  private async initStorage() {
    await this.storage.create();
  }
  async login(username: string, password: string): Promise<boolean> {
    if (await this.loginWithStorage(username, password)) {
      await this.storage.set('isLoggedIn', true);
      return true;
    } else {
      return false;
    }
  }

  async logout(): Promise<void> {
    await this.storage.remove('isLoggedIn');
  }

  async isAuthenticated(): Promise<boolean> {
    const isLoggedIn = await this.storage.get('isLoggedIn');
    return isLoggedIn === true;
  }

  // ...

  private async loginWithStorage(username: string, password: string): Promise<boolean> {
    const storedData = await this.storage.get('userData');

    if (storedData) {
      if (username === storedData.usuario && password === storedData.password) {
        return true;
      }
    }

    return false;
  }
}
