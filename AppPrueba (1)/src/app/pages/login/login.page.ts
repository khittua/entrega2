import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../auth.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

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
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private platform: Platform, private sqlite: SQLite)  {
    this.RegisterForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
 
  initializeDatabase() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'myDatabase.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, password TEXT, nombre TEXT, apellido TEXT, rut TEXT, region TEXT, comuna TEXT)', [])
        .then(() => console.log('Tabla creada correctamente'))
        .catch(error => console.error('Error al crear la tabla', error));
      })
      .catch(error => console.error('Error al abrir la base de datos', error));
    });
  }

  submit() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'myDatabase.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM userData WHERE usuario = ? AND password = ?', [this.usuario, this.password])
        .then((data) => {
          if (data.rows.length > 0) {
            // Usuario autenticado
            this.router.navigate(['/qr']);
          } else {
            // Usuario no autenticado
            console.log('Usuario no autenticado');
          }
        })
        .catch(error => console.error('Error al seleccionar datos', error));
      });
    });
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
