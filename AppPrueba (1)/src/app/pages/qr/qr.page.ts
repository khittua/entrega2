import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  showOverlay: boolean = true;
  title='scanner' 
  @ViewChild('scanner')
  scanner!:ZXingScannerComponent;
  qrResultString!:string;
  qrResult!:Result;
  currentDevice!: MediaDeviceInfo;

  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE,
     BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX];
  constructor(private router: Router) { }

  ngOnInit() {
   
    
  }

  handeQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    this.qrResultString = resultString;
  
    // Cambia la visibilidad del overlay para ocultarlo
    this.showOverlay = false;
  
    setTimeout(() => {
      // Después de 2 segundos, navega a /clase
      this.router.navigate(['/clase', { datosClase: this.qrResultString }]);
    }, 1000); // 2000 milisegundos = 2 segundos
  }


}
