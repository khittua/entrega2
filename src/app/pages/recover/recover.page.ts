import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  noUserData: boolean = false;
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  password: string = '';
  constructor(private router: Router) { }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    // Verifica si hay datos de usuario en el Local Storage
    const userDataString = localStorage.getItem('userData');

    if (!userDataString) {
      this.noUserData = true;
    }
  }

  recuperarContrasena() {
    
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      
     
      userData.password = this.nuevaContrasena;
      
      
      localStorage.setItem('userData', JSON.stringify(userData));
      this.router.navigate(['/login']);
      console.log('Contraseña actualizada correctamente.');
    } else {
      console.error('No se encontraron datos de usuario en el Local Storage.');
    }
  }
}
