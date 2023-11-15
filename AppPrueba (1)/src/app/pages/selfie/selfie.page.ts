import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, CameraDirection  } from '@capacitor/camera';


@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.page.html',
  styleUrls: ['./selfie.page.scss'],
})
export class SelfiePage implements OnInit {

  constructor() { }

  ngOnInit() {
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
        const imageUrl = image.webPath;
        // Haz lo que necesites con la imagen, como mostrarla en tu interfaz de usuario
      }
    } catch (error) {
      // Maneja los errores
    }
  }
}

