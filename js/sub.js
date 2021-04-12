
////////////////////////////// CALCULO DISTANCIAS //////////////////////////////

//let provincia = "BUENOS AIRES"
let cp1 = 1714;
let cp2 = 6000;
//console.log(cp1);

// RECORRE VEHICULOS EN BASE //
for(let ubicacion of GEO){
}
const loc1 = GEO.find(geo1 => (geo1.cp === cp1));
    //console.log(loc1);
    //console.log(ubicacion);
    localStorage.setItem("origen",JSON.stringify(loc1));
    let origen = JSON.parse(localStorage.getItem("origen"));
    console.log(origen);
    let lat1 = origen.latitud;
    console.log(lat1);
    let lon1 = origen.longitud;
    console.log(lon1);

const loc2 = GEO.find(geo2 => (geo2.cp === cp2));
    //console.log(loc2);
    //console.log(ubicacion);
    localStorage.setItem("destino",JSON.stringify(loc2));
    let destino = JSON.parse(localStorage.getItem("destino"));
    console.log(destino);
    let lat2 = destino.latitud;
    console.log(lat2);
    let lon2 = destino.longitud;
    console.log(lon2);

function getDistanciaMetros(lat1,lon1,lat2,lon2){
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km 
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a =   Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
            Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  //aquí obtienes la distancia en metros por la conversion 1Km =1000m
  var d = R * c; 
  return ( d .toFixed(2) ); 
}
console.log(getDistanciaMetros(lat1,lon1,lat2,lon2));