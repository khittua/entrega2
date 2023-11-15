# App
Usar modo oscuro 

La hice en modo oscuro sin pensar en que en modo claro se vería mal, perdón

# Login
El login funciona con local storage, pero sólo permite un usuario, si se registra otro, se borra el anterior

No se puede recuperar la contraseña si no hay ningún dato en el localstorage, manda un mensaje que necesitas registrarte primero

# QR
Para pasar los datos del qr a la otra página de confirmación, ocupé el enrutamiento de los parametros por el path

Cuándo se registra la clase, se muestran los datos de esta, los datos del alumno, y se muestra la hora a la que se scanneó el QR

npm i @zxing/browser@latest --save

npm i @zxing/library@latest --save

npm i @zxing/ngx-scanner@latest --save
