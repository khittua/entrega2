import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  regiones: any[] = [];
  comunas: any[] = [];
  regionSeleccionada: string = '';
  comunaSeleccionada: string = '';
  regionesApiUrl = 'https://dev.matiivilla.cl/duoc/location/region';
  comunasApiUrl = 'https://dev.matiivilla.cl/duoc/location/comuna/';

  slideAnimationActive: boolean = false;
  NombreForm: FormGroup;
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  rut: string = '';
  nivelEducacion: string = '';
  selectedDate: string = '';
  showDatetimePicker: boolean = false;
  constructor(private modalController: ModalController, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private platform: Platform, private sqlite: SQLite) {
    this.NombreForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      
    });
    
  }


  initializeDatabase() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'myDatabase.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        // Aquí puedes ejecutar consultas SQL o inicializar tablas.
        // Ejemplo: 
        db.executeSql('CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, password TEXT, nombre TEXT, apellido TEXT, rut TEXT, region TEXT, comuna TEXT)', [])
        .then(() => console.log('Tabla creada correctamente'))
        .catch(error => console.error('Error al crear la tabla', error));
      })
      .catch(error => console.error('Error al abrir la base de datos', error));
    });
  }
  

  limpiarCampos() {
    this.usuario = ''; 
    this.password = ''; 
    this.nombre = '';
    this.apellido = ''; 
    this.rut = ''; 
    this.slideAnimationActive = true;
    setTimeout(() => {
      this.slideAnimationActive = false; 
    }, 1000);
    
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.http.get(this.regionesApiUrl).subscribe((response: any) => {
      if (response.success) {
        this.regiones = response.data;
      }
    });
  }

  onRegionSelected(regionId: number) {
    this.http.get(this.comunasApiUrl + regionId).subscribe((response: any) => {
      if (response.success) {
        this.comunas = response.data;
      }
    });
  }
  

  register() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'myDatabase.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        const region = this.regiones.find((r) => r.id === this.regionSeleccionada);
        const comuna = this.comunas.find((c) => c.id === this.comunaSeleccionada);
  
        db.executeSql('INSERT INTO userData (usuario, password, nombre, apellido, rut, region, comuna) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [this.usuario, this.password, this.nombre, this.apellido, this.rut, region ? region.nombre : '', comuna ? comuna.nombre : ''])
        .then(() => {
          console.log('Datos guardados en la base de datos');
          this.router.navigate(['/login']);
        })
        .catch(error => console.error('Error al insertar datos', error));
      });
    });
  }

  
}