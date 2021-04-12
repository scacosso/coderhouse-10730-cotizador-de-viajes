$(document).ready(function(){
  $("#botonEnviar").click(function(){
    $("#elFormulario").hide(1000);
    $("#notificacion").show(1000);
  });
});

$("#botonVolver").click(function(){
    $("#elFormulario").show(1000);
    $("#notificacion").hide(1000);
});


// EVENTO DE PRIMER BOTON //
var cantPallet = $("#botonEnviar").click(function(event) {
  event.preventDefault();
 // localStorage.clear();
  let nombre = $("#nombre").val();
  let mail = $("#mail").val();
  var cant = $("#pallet").val();
  var kg = $("#kg").val();
  let fecha =$("#fecha").val();
  var origen = $("#origen").val();
  var destino = $("#destino").val();

// ENVIO DATOS DE FORMULARIO A STORAGE // 
  localStorage.setItem("nombreOrig",JSON.stringify(nombre));
  localStorage.setItem("mailOrig",JSON.stringify(mail));
  localStorage.setItem("cantidadPallet",JSON.stringify(cant));
  localStorage.setItem("kg",JSON.stringify(kg));
  localStorage.setItem("fechaEntrega",JSON.stringify(fecha));
  localStorage.setItem("cpOrig",JSON.stringify(origen));
  localStorage.setItem("cpDest",JSON.stringify(destino));

// // RECIBO DATOS DE STORAGE //
//   let cp1 = parseInt(JSON.parse(localStorage.getItem("cpOrig")));
//   let cp2 = parseInt(JSON.parse(localStorage.getItem("cpDest")));
//   console.log(cp1);
//   console.log(cp2);
  
// ////////////////////////////// CALCULO DISTANCIAS //////////////////////////////
// var lat1 = JSON.parse(localStorage.getItem("lat1"));
// var lon1 = JSON.parse(localStorage.getItem("lon1"));
// var lat2 = JSON.parse(localStorage.getItem("lat2"));
// var lon2 = JSON.parse(localStorage.getItem("lon2"));
// console.log(lat1);
// console.log(lon1);
// console.log(lat2);
// console.log(lon2);

// function getDistanciaMetros(lat1,lon1,lat2,lon2){
//     rad = function(x) {return x*Math.PI/180;}
//     var R = 6378.137; //Radio de la tierra en km 
//     var dLat = rad( lat2 - lat1 );
//     var dLong = rad( lon2 - lon1 );
//     var a =   Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
//               Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
//   //Aca obtienes la distancia en metros por la conversion 1Km =1000m
//     var d = R * c;
//     console.log(d);
    
//     return ( d .toFixed(2) ); 
//   }
  
//   let distancia = getDistanciaMetros(lat1,lon1,lat2,lon2)
//   console.log(distancia);


  
// // DATOS UBICACIONES //
// for(let ubicacion of GEO){
//     }

//     const loc1 = GEO.find(geo1 => (geo1.cp == cp1));
//     console.log(loc1);
//     //console.log(ubicacion);
//     localStorage.setItem("origen",JSON.stringify(loc1));
//     let origen1 = JSON.parse(localStorage.getItem("origen"));
//     //console.log(origen1);
//     let lat11 = JSON.parse(origen1.latitud);
//     localStorage.setItem("lat1",JSON.stringify(origen1.latitud));
//     console.log(lat1);
//     let lon11 = JSON.parse(origen1.longitud);
//     localStorage.setItem("lon1",JSON.stringify(origen1.longitud));
//     console.log(lon1);


//   const loc2 = GEO.find(geo2 => (geo2.cp == cp2));
//   //console.log(loc2);
//   //console.log(ubicacion);
//   localStorage.setItem("destino",JSON.stringify(loc2));
//   let destino1 = JSON.parse(localStorage.getItem("destino"));
//   console.log(destino1);
//   let lat22 = JSON.parse(destino1.latitud);
//   localStorage.setItem("lat2",JSON.stringify(destino1.latitud));
//   let lon22 = JSON.parse(destino1.longitud);
//   localStorage.setItem("lon2",JSON.stringify(destino1.longitud));
//   console.log(lon2);



//   localStorage.setItem("distancia",JSON.stringify(distancia));
//   var dist = JSON.parse(localStorage.getItem("distancia"));
//   console.log(distancia);

 
// AJAX CON JQUERY DATOS VEHICULOS //
  $.getJSON("js/data.json", function (date, estado) {
  
// RECORRE VEHICULOS EN BASE //
     for(var DATA of date){
     }
      
// FILTRO DE VEHICULOS Y GUARDO EN LOCALSTORAGE //  
  if (((cant > 0) && (cant <= 8)) && ((kg > 0) && (kg <= 15000))) {
    const found = date.find(vehic => ((vehic.capacidadPalletMax >= cant) && (vehic.capacidadKgMax >= kg)));
    localStorage.setItem("vehiculoOfrecido",JSON.stringify(found));
    let vehiculoOfrecido = JSON.parse(localStorage.getItem("vehiculoOfrecido"));
    
    let imagen = vehiculoOfrecido.imagen;
    let patente = vehiculoOfrecido.patente;
    let url = urlpatente(patente);
    
    function urlpatente (patente){
      if(patente.length < 7){
        return (`https://matriculasdelmundo.com/gARG2.php?textARG2=${patente}`);
      }
      else{
        return (`https://matriculasdelmundo.com/gARG1.php?textARG1=${patente}`);
      }
    }

// DECLARA VARIABLES //
    let tipoVehic = vehiculoOfrecido.tipoVehiculo;
    let tamanio = vehiculoOfrecido.tamanio;
    let capMin = vehiculoOfrecido.capacidadPalletMin;
    let capMax = vehiculoOfrecido.capacidadPalletMax;
    let precioPal = vehiculoOfrecido.precioPallet;
    let precioKm = vehiculoOfrecido.pracioKm;
    console.log(precioKm);

    
// GENERA TARJETA DE VEHICULO OFRECIDO O DA RESPUESTA FUERA DE RANGO //    
    function generarNoti(vehiculoOfrecido){
        $("#notificacion").empty()
        $("#notificacion").append(componenteCard(vehiculoOfrecido))
      }
      
      
      $("#notificacion").append(generarNoti);
      function componenteCard(){
        return `
                  <div class="card " style="max-width: 540px;">
                  <div class="row no-gutters">
                  <h2 class="text-center text-secondary mt-3">Vehiculo Ofrecido</h2>
                    <div class="col-10 col-md-6">
                      <img class="w-100 h-auto img-responsive center-block" src="${imagen}" alt="${tipoVehic} ${tamanio}">
                      <h5 class="text-center">${tipoVehic} ${tamanio}</h5>
                      <div class="text-center">                
                      <img class="col-6 mb-5" src="${url}" alt="Patente ${patente}">
                      </div>
                      </div>
                    <div class="col-10 col-md-6">
                      <div class="card-body">
                        <p>Hola <b>${nombre}</b>.</p>
                        <p class='card-text'>
                          Este vehiculo tiene una capacidad mínima de <b>${capMin}</b> pallet y un máximo de <b>${capMax}</b> pallets. <br> Para transportar <b>${cant}</b> pallet el costo es de <b>$${precioPal*cant}</b>.<br> 
                        </p>
                        <div>
                        <button id="botonVolver" class="btn btn-danger text-center mt-4">Volver</button>
                        <button id="botonContratar" type="button" class="btn btn-success text-center mt-4">Contratar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
      }
    }

    else { 
      function generarNoti(vehiculoOfrecido){
        
        $("#notificacion").empty()
        $("#notificacion").append(componenteCard(vehiculoOfrecido))
        
      }
      
      $("#notificacion").append(generarNoti);
      function componenteCard(){
        return `
                <div class='card shadow-sm'>
                <h2>Vehiculo Ofrecido</h2>
                <p class="alert alert-danger mt-3" role="alert">La cantidad de pallets debe ser mayor a <b>0</b> o menor que <b>9</b>.</p>
                <p class="alert alert-danger mt-3" role="alert">La cantidad Kg debe ser mayor a <b>0</b> o menor que <b>15.000</b>.</p>
                <div class="text-center p-2">
                <button id="botonVolver" class="btn btn-primary text-center mt-4">Volver</button>
                </div>
                </div>

              `
      }
    }

    
  });
 
});

