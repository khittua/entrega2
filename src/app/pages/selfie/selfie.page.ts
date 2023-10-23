import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, CameraDirection  } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.page.html',
  styleUrls: ['./selfie.page.scss'],
})
export class SelfiePage implements OnInit {
  datosClase: string = '';
  selfieImageUrl: string | undefined;
  constructor(private storage: Storage, private router: Router, private navCtrl: NavController, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.datosClase = params['datosClase'];
    });
  }


  async takeSelfie() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        direction: CameraDirection.Front,
      });
  
      if (image) {
        // image.webPath contiene la ruta de la imagen que puedes mostrar en tu aplicación
        this.selfieImageUrl = image.webPath; // Asigna la URL de la selfie a selfieImageUrl
  
        // Ahora, puedes navegar a ClasePage al presionar el botón "submit"
      }
    } catch (error) {
      // Maneja los errores
    }
  }
  
  submit() {
    // Comprueba si la selfie ha sido tomada
    if (this.selfieImageUrl) {
      // Navega a ClasePage y pasa la URL de la selfie y los datos de la clase como parámetros
      this.router.navigate(['/clase', { selfieImageUrl: this.selfieImageUrl, datosClase: this.datosClase }]);
    } else {
      // Maneja el caso en el que no se haya tomado la selfie
      console.log('Debes tomar una selfie antes de confirmar');
    }
  }
  
  
  
  
  
  

}

