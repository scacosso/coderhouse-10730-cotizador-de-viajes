moment.locale('es');
//////////////////////////////////////////// PASO 1 - FORMULARIO ORIGEN /////////////////////////////////
$(document).ready(function () {
    $("#formularioOrigen").show(1000);
    $("#formularioDestino").hide(0);
    $("#mostrarVehiculo").hide(0);
    $("#presupuesto").hide(0);
    $("#gracias").hide(0);
    localStorage.clear();

});

$("#formularioOrigen").append(
  `
      <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="text-center text-secondary">Origen del Viaje</h2>
        <div>
          <form class="row justify-content-center" id="forigen">
              <input id="nombreOrigen" name="nombreOrigen" type="text" class="form-control col-5 m-2" placeholder="Nombre y Apellido">
              <input id="mailOrigen" name="mailOrigen" type="mail" class="form-control col-5 m-2" placeholder="Email">
              <input id="pallet" name="pallet" type="text" class="form-control col-5 m-2" placeholder="Cantidad de pallets">
              <input id="kg" name="kg" type="text" class="form-control col-5 m-2" placeholder="Kg totales">
              <input id="fechaOrigen" name="fechaOrigen" type="date" class="form-control col-10 m-2" placeholder="Fecha de traslado">
              <input id="direccionOrigen" name="direccionOrigen" type="text" class="form-control col-7 m-2" placeholder="Direccion Origen">
              <input id="cpOrigen" name="cpOrigen" type="text" class="form-control col-3 m-2" placeholder="CP de Origen">
              <button id="botonADestino" class="btn btn-primary text-center shadow rounded-pill col-5 mt-4">Siguiente</button>
          </form>
        </div>
      </div>
      </div>
`);

//////////////////////////////////////////// PASO 2 - FORMULARIO DESTINO /////////////////////////////////
$("#botonADestino").click(function(event) {
  event.preventDefault();
      $("#formularioOrigen").hide(0);
      $("#formularioDestino").show(1000);
      $("#mostrarVehiculo").hide(0);
      $("#presupuesto").hide(0);
      $("#gracias").hide(0);
  
      //console.log(event);

  // ENVIO DATOS DE FORMULARIO A STORAGE // 
      localStorage.setItem("nombreOrigen",JSON.stringify($("#nombreOrigen").val()));
      localStorage.setItem("mailOrigen",JSON.stringify($("#mailOrigen").val()));
      localStorage.setItem("pallet",JSON.stringify($("#pallet").val()));
      localStorage.setItem("kg",JSON.stringify($("#kg").val()));
      localStorage.setItem("fechaOrigen",JSON.stringify($("#fechaOrigen").val()));
      localStorage.setItem("direccionOrigen",JSON.stringify($("#direccionOrigen").val()));
      let cp1 = localStorage.setItem("cpOrigen",JSON.stringify($("#cpOrigen").val()));
      guardaCoorCP1(cp1);
});

$("#formularioDestino").append(
  `
      <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="text-center text-secondary">Destino del Viaje</h2>
        <div>
          <form class="row justify-content-center" id="fdestino">
              <input id="nombreDestino" type="text" class="form-control col-5 m-2" placeholder="Nombre y Apellido">
              <input id="mailDestino" type="mail" class="form-control col-5 m-2" placeholder="Email">
              <input id="fechaDestino" type="date" class="form-control col-10 m-2" placeholder="Fecha de traslado">
              <input id="direccionDestino" type="text" class="form-control col-5 m-2" placeholder="Direcion Destino">
              <input id="cpDestino" type="text" class="form-control col-5 m-2" placeholder="CP de Destino">
              <button id="volverAOrigen" class="btn btn-danger text-center shadow rounded-pill col-5 m-2">Volver</button>
              <button id="botonAVehiculo" class="btn btn-primary text-center shadow rounded-pill col-5 m-2">Consultar</button>
          </form>
        </div>
      </div>
      </div>
`);

/// BOTON VOLVER A FORMULARIO DE ORIGEN ///
$("#volverAOrigen").click(function(event) {
  event.preventDefault();
      $("#formularioOrigen").show(1000);
      $("#formularioDestino").hide(0);
      $("#mostrarVehiculo").hide(0);
      $("#presupuesto").hide(0);
      $("#gracias").hide(0);
});

//////////////////////////////////////////// PASO 3 - MUESTRA VEHICULO /////////////////////////////////
$("#botonAVehiculo").click(function(event) {
  event.preventDefault();
      $("#formularioOrigen").hide(0);
      $("#formularioDestino").hide(0);
      $("#mostrarVehiculo").show(1000);
      $("#presupuesto").hide(0);
      $("#gracias").hide(0);

      console.log(event);

    // ENVIO DATOS DE FORMULARIO A STORAGE // 
      localStorage.setItem("nombreDestino",JSON.stringify($("#nombreDestino").val()));
      localStorage.setItem("mailDestino",JSON.stringify($("#mailDestino").val()));
      localStorage.setItem("fechaDestino",JSON.stringify($("#fechaDestino").val()));
      localStorage.setItem("direccionDestino",JSON.stringify($("#direccionDestino").val()));
      let cp2 = localStorage.setItem("cpDestino",JSON.stringify($("#cpDestino").val()));
      let pallet = parseInt(JSON.parse(localStorage.getItem("pallet")));
      let kg = parseInt(JSON.parse(localStorage.getItem("kg")));
      guardaCoorCP2(cp2);
      muestraVehiculo(pallet, kg);
});



// muestra vehiculo funciona ////////

function muestraVehiculo(pallet,kg) {
  $.getJSON("js/data.json", function (date, estado) {
          
    if (((pallet > 0) && (pallet <= 8)) && ((kg > 0) && (kg <= 15000))) {
      const found = date.find(vehic => ((vehic.capacidadPalletMax >= pallet) && (vehic.capacidadKgMax >= kg)));
      localStorage.setItem("vehiculoOfrecido",JSON.stringify(found));
      let vehiculoOfrecido = JSON.parse(localStorage.getItem("vehiculoOfrecido"));
      
      let imagen = vehiculoOfrecido.imagen;
      let tipoVehic = vehiculoOfrecido.tipoVehiculo;
      let tamanio = vehiculoOfrecido.tamanio;
      let patente = vehiculoOfrecido.patente;
      let url = urlpatente(patente);
      let capMin = vehiculoOfrecido.capacidadPalletMin;
      let capMax = vehiculoOfrecido.capacidadPalletMax;
      let precioPal = vehiculoOfrecido.precioPallet;
      let precioKm = vehiculoOfrecido.precioKm;
      let nombre = JSON.parse(localStorage.getItem("nombreOrigen"));
      

      $("#mostrarVehiculo").html(
        `
        <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="text-center text-secondary">Vehiculo Ofrecido</h2>
          <div>
          <div class="row no-gutters">
            <div class="col-10 col-md-6 text-center">
              <img class="w-80 h-auto img-responsive center-block" src="${imagen}" alt="${tipoVehic} ${tamanio}">
              <h5 class="text-center">${tipoVehic} ${tamanio}</h5>
              <img class="patente" src="${url}" alt="Patente ${patente}">
            </div>
            <div class="col-10 col-md-6">
              <div class="card-body">
                <p>Hola <b>${nombre}</b>.</p>
                <p class='card-text'>
                  Este vehiculo tiene una capacidad mínima de <b>${capMin}</b> pallet y un máximo de <b>${capMax}</b> pallets. 
                  <br> Tiene un costo por pallet de <b>$${precioPal}</b>.
                  <br> Tiene un costo por Km de <b>$${precioKm}</b>.
                </p>
              </div>
            </div>
            <div class="col-12 text-center">
                <button id="volverADestino" class="btn btn-danger text-center shadow rounded-pill col-5 m-2">Volver</button>
                <button id="botonContratar" type="button" class="btn btn-primary text-center shadow rounded-pill col-5 m-2">Siguiente</button>
            </div>
          </div>
        </div>
        </div>
        </div>
        `);
    }
    else {
      $("#mostrarVehiculo").html(
        `
              <div class='card shadow-sm'>
              <h2>Vehiculo Ofrecido</h2>
              <p class="alert alert-danger mt-3" role="alert">La cantidad de pallets debe ser mayor a <b>0</b> o menor o igual a <b>8</b>.</p>
              <p class="alert alert-danger mt-3" role="alert">La cantidad Kg debe ser mayor a <b>0</b> o menor que <b>5.000</b>.</p>
              <div class="text-center p-2">
              <button id="botonVolver" class="btn btn-primary text-center mt-4">Volver</button>
              </div>
              </div>
        `
      )}
    
    function urlpatente (patente){
        if(patente.length < 7){
          return (`https://matriculasdelmundo.com/gARG2.php?textARG2=${patente}`);
        }
        else{
          return (`https://matriculasdelmundo.com/gARG1.php?textARG1=${patente}`);
        }
      } 

      $("#botonContratar").click(function(event) {
        event.preventDefault();
            $("#formularioOrigen").hide(0);
            $("#formularioDestino").hide(0);
            $("#mostrarVehiculo").hide(0);
            $("#presupuesto").show(1000);
            $("#gracias").hide(0);
            calculoDistencia();
            diasAlmacenado()
            muestraPresupuesto();
      });

      /// BOTON VOLVER A FORMULARIO DE DESTINO ///
      $("#volverADestino").click(function(event) {
        event.preventDefault();
            $("#formularioOrigen").hide(0);
            $("#formularioDestino").show(1000);
            $("#mostrarVehiculo").hide(0);
            $("#presupuesto").hide(0);
            $("#gracias").hide(0);
      });

  })};


//////////////////////////////////////////// PASO 4 - MUESTRA PRESUPUESTO /////////////////////////////////

function muestraPresupuesto () {

let pallet = JSON.parse(localStorage.getItem("pallet"));
let pPallet = JSON.parse(localStorage.getItem("vehiculoOfrecido"));
let precioPallet = pPallet.precioPallet;

let km = JSON.parse(localStorage.getItem("distancia"));
let pKm = JSON.parse(localStorage.getItem("vehiculoOfrecido"));
let precioKm = pKm.precioKm;

let dias = JSON.parse(localStorage.getItem("diasAlmacenado"));

$("#presupuesto").html(
`
<div class="card shadow-sm">
<div class="card-body w-80">
  <h2 class="text-center text-secondary">Presupuesto</h2>
  <div>
  <table class="table table-hover">
  <thead>
    <tr>
      <th>Items</th>
      <th>Cantidad</th>
      <th>Precio Unitario</th>
      <th>Precio Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Pallet</th>
      <td>${pallet}</td>
      <td>${precioPallet}</td>
      <td>$${(pallet*precioPallet).toFixed(2)}</td>
    </tr>
    <tr>
      <th scope="row">Kms</th>
      <td>${km}</td>
      <td>${precioKm}</td>
      <td>$${(km*precioKm).toFixed(2)}</td>
    </tr>
    <tr>
      <th scope="row">Dias Almacenado<br> por pallet</th>
      <td>${dias}</td>
      <td>${1000}</td>
      <td>$${(dias*1000*pallet).toFixed(2)}</td>
    </tr>
    <tr>
    <th scope="row">TOTAL</th>
    <td></td>
    <td></td>
    <td><b>$${(km*precioKm+pallet*precioPallet+dias*1000*pallet).toFixed(2)}</b></td>
  </tr>
  </tbody>
</table>
  </div>
  <div class="col-12 text-center">
        <button id="volverAVehiculo" class="btn btn-danger text-center shadow rounded-pill col-5 m-2">Volver</button>
        <button id="botonConfirmado" type="button" class="btn btn-success text-center shadow rounded-pill col-5 m-2">Contratar</button>
    </div>
</div>
</div>
`);

      /// BOTON VOLVER A FORMULARIO DE DESTINO ///
      $("#volverAVehiculo").click(function(event) {
        event.preventDefault();
            $("#formularioOrigen").hide(0);
            $("#formularioDestino").hide(0);
            $("#mostrarVehiculo").show(1000);
            $("#presupuesto").hide(0);
            $("#gracias").hide(0);
      });


$("#botonConfirmado").click(function(event) {
  event.preventDefault();
      $("#formularioOrigen").hide(0);
      $("#formularioDestino").hide(0);
      $("#mostrarVehiculo").hide(0);
      $("#presupuesto").hide(0);
      $("#gracias").show(1000);
      postViaje();
});
}



//////////////////////////////////////////// PASO 5 - FORMULARIO ORIGEN /////////////////////////////////


$("#gracias").html(
`
<div class="card shadow-sm">
<div class="card-body w-100">
  <h2 class="text-center text-secondary">Confirmado</h2>
  <div class="text-center">
    <img class="" src="img/622b1cde2dcc0133175c769f7e53b9e2.png" alt="Confirmado">
  </div>
  <div id="informePost"> </div>  
</div>
</div>
`);


////////////////////////////// CALCULO DISTANCIAS //////////////////////////////
function guardaCoorCP1(cp1){
  let cp = parseInt(JSON.parse(localStorage.getItem("cpOrigen")));

  for(let ubicacion of GEO){
  }

  const loc1 = GEO.find(geo1 => (geo1.cp == cp));
  localStorage.setItem("origen",JSON.stringify(loc1));
  let origen1 = JSON.parse(localStorage.getItem("origen"));
  let lat1   = JSON.parse(origen1.latitud);
  localStorage.setItem("lat1",JSON.stringify(origen1.latitud));
  let lon1 = JSON.parse(origen1.longitud);
  localStorage.setItem("lon1",JSON.stringify(origen1.longitud));
}

function guardaCoorCP2(cp2){
  let cp = parseInt(JSON.parse(localStorage.getItem("cpDestino")));

  for(let ubicacion of GEO){
  }

  const loc2 = GEO.find(geo2 => (geo2.cp == cp));
  
  localStorage.setItem("destino",JSON.stringify(loc2));
  let destino2 = JSON.parse(localStorage.getItem("destino"));
  let lat2   = JSON.parse(destino2.latitud);
  localStorage.setItem("lat2",JSON.stringify(destino2.latitud));
  let lon2 = JSON.parse(destino2.longitud);
  localStorage.setItem("lon2",JSON.stringify(destino2.longitud));
}

function calculoDistencia() {
  
// RECIBO DATOS DE STORAGE //
var lat1 = JSON.parse(localStorage.getItem("lat1"));
var lon1 = JSON.parse(localStorage.getItem("lon1"));
var lat2 = JSON.parse(localStorage.getItem("lat2"));
var lon2 = JSON.parse(localStorage.getItem("lon2"));





function getDistanciaMetros(lat1,lon1,lat2,lon2){
    rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a =   Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
              Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  //Aca obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c;
    
    
    return ( d .toFixed(2) ); 
  }
  
  let distancia = getDistanciaMetros(lat1,lon1,lat2,lon2)
  

  localStorage.setItem("distancia",JSON.stringify(distancia));
 
}

/////////////////////////// POST VIAJE //////////////////////
function postViaje() {  

var datos = {
  "nombreOrigen" : JSON.parse(localStorage.getItem("nombreOrigen")),
  "mailOrigen" : JSON.parse(localStorage.getItem("mailOrigen")),
  "fechaOrigen" : JSON.parse(localStorage.getItem("fechaOrigen")),
  "direccionOrigen" : JSON.parse(localStorage.getItem("direccionOrigen")),
  "cpOrigen" : JSON.parse(localStorage.getItem("cpOrigen")),
  "nombreDestino" : JSON.parse(localStorage.getItem("nombreDestino")),
  "nombreDestino" : JSON.parse(localStorage.getItem("nombreDestino")),
  "fechaDestino" : JSON.parse(localStorage.getItem("fechaDestino")),
  "direccionDestino" : JSON.parse(localStorage.getItem("direccionDestino")),
  "cpDestino" : JSON.parse(localStorage.getItem("cpDestino")),
};

var url = "https://jsonplaceholder.typicode.com/posts"; // URL a la cual enviar los datos

enviarDatos(datos, url); // Ejecutar cuando se quiera enviar los datos

function enviarDatos(datos, url){
    let dias = JSON.parse(localStorage.getItem("diasAlmacenado"));
    function fechaEntrega(dias) {
      let fechaEntrega = moment().add(dias, 'days').calendar();
      localStorage.setItem("fechaEntrega",JSON.stringify(fechaEntrega));
      return JSON.parse(localStorage.getItem("fechaEntrega"));
    }

    $.ajax({
          data: datos,
          url: url,
          type: 'post',
          success:  function (response) {
              $(informePost).append(`
              <div class="alert alert-success text-center" role="alert">
                  <strong>Bien hecho!</strong> Pedido Nro: <b>${response.id}</b>
                  <br>Se entregará: <b>${fechaEntrega(dias)}</b>.
              </div>
              `);
          },
          error: function (error) {
            $(informePost).append(`
            <div class="alert alert-danger text-center" role="alert">
                <strong>Bien hecho!</strong> Error Nro: ${response.id}. Su pedido no pudo ser procesado.
            </div>
            `);    
          }
  });
}
}

/////////////////////////// CALCULA DIAS ALMACENADO //////////////////////
function diasAlmacenado() {
  let fecha1 = moment(JSON.parse(localStorage.getItem("fechaOrigen")));
  let fecha2 = moment(JSON.parse(localStorage.getItem("fechaDestino")));
  let dias = (fecha2.diff(fecha1, 'days'));
  localStorage.setItem("diasAlmacenado",JSON.stringify(dias));
}