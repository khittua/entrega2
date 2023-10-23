import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';


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
  constructor(private modalController: ModalController, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private storage: Storage) {
    this.NombreForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      
    });
    
  }
  initializeDatabase() {
    this.storage.create();
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
    this.initializeDatabase();
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
    const region = this.regiones.find((r) => r.id === this.regionSeleccionada);
    const comuna = this.comunas.find((c) => c.id === this.comunaSeleccionada);
  
    const userData = {
      usuario: this.usuario,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      region: region ? region.nombre : '',
      comuna: comuna ? comuna.nombre : '',
    };
    console.log('Datos a guardar:', userData);
  
    this.storage.set('userData', userData).then(() => {
      console.log('Datos guardados en Ionic Storage');
      this.router.navigate(['/login']);
    });
  }
  
}