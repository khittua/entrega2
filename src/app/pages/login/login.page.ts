import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  RegisterForm: FormGroup;
  usuario: string = ''; 
  contrasena: string = ''; 
  password: string = '';
  authenticated: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private storage: Storage) {
    this.RegisterForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
 

  async submit() {
    
      if (this.usuario && this.password) { // Usar las variables usuario y password
        const authenticated = await this.authService.login(this.usuario, this.password);
  
        if (authenticated) {
          this.router.navigate(['/qr']);
        } else {
          // Usuario no autenticado
          console.log('Usuario no autenticado');
        }
      }
    
  }

  register() {
    this.router.navigate(['/home']);
  }
  recover(){
    this.router.navigate(['/recover']);
  }
  
  ngOnInit() {
  }

}
