import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {
  datosClase: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  region: string = '';
  comuna: string = '';
  timestampCarga: number = Date.now();
  latitud: number = 0;
  longitud: number = 0;
  currentCoordinates: Position | undefined;
  selfieImageUrl: string | null | undefined;
  
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0'); // Asegura 2 dígitos
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Asegura 2 dígitos
    return `${hours}:${minutes}`;
  }
  constructor(private router: Router,private route: ActivatedRoute, private storage: Storage) {
    this.initStorage();
   }

   private async initStorage() {
    await this.storage.create();
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.selfieImageUrl = params.get('selfieImageUrl');
    });
    Geolocation.getCurrentPosition().then((position: Position) => {
      // Almacena las coordenadas actuales en la variable
      this.currentCoordinates = position;

      // Puedes acceder a las coordenadas individualmente si es necesario
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.latitud = latitude;
      this.longitud = longitude;
      console.log('Longitud:', longitude);
    }).catch((error) => {
      console.error('Error al obtener las coordenadas:', error);
    });

    this.route.params.subscribe(params => {
      this.datosClase = params['datosClase'];
    });

    const userData = await this.storage.get('userData');

  if (userData) {
    this.nombre = userData.nombre;
    this.apellido = userData.apellido;
    this.rut = userData.rut;
    this.comuna = userData.comuna;
    this.region = userData.region;
  }
}



}
