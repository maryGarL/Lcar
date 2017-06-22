  function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  // var infoWindow = new google.maps.InfoWindow({map: map});

  var latitud,longitud,miUbicacion;
  var exito = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

  miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });
    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud});
  }

  var error = function (error) {
    alert("Tenemos un problema con encontrar tu ubicación");
  }

  function buscar() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(exito,error);
    }
  }

  window.addEventListener('load',buscar,false);
  var partida=document.getElementById("partida");
  var destino=document.getElementById("destino");

  new google.maps.places.Autocomplete(partida);
  new google.maps.places.Autocomplete(destino);

  var directionsS= new google.maps.DirectionsService;
  var directionsR=new google.maps.DirectionsRenderer;

  var calculaRoute = function(directionsS,directionsR){
    directionsS.route({
      origin:partida.value,
      destination:destino.value,
      travelMode:'DRIVING'
    },function (response,status){
      if(status==='OK'){

        console.log(response.routes[0].legs[0].distance.text.replace("km",""));
        var distancia= Number(response.routes[0].legs[0].distance.text.replace("km","").replace(",","."));
        console.log(distancia);
        var tarifa=document.getElementsByClassName('tarifa')[0];
        tarifa.classList.remove("none");

        var costo=distancia*1.75;

        tarifa.innerHTML="S/."+parseInt(costo);

        directionsR.setDirections(response);
        miUbicacion.setMap(null);

      }else{
        window.alert("No encontramos la ruta");
      }
    });
  }

  directionsR.setMap(map);


  var trazarRuta=function(){
    calculaRoute(directionsS,directionsR);
  }

  document.getElementById('trazar').addEventListener('click',trazarRuta);

}
