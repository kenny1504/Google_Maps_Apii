const getLocations = () => {
    
        $.ajax({
            type: "POST",
            url: 'Consulta.php',
            success: function(data)
            {

                //Convertimos json a array
                var locations = JSON.parse(data);

                let locationsInfo = []
                
                locations.forEach(location => {
                    let locationData = {
                        position:{lat:parseFloat(location.latitud),lng:parseFloat(location.longitud)},
                        name:location.nombre                
                    }
                    locationsInfo.push(locationData)
                })

                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition((data)=>{
                        let currentPosition = {
                            lat: data.coords.latitude,
                            lng: data.coords.longitude
                        }
                        dibujarMapa(currentPosition, locationsInfo)
                    })
                }

          }
    });
}

const dibujarMapa = (obj, locationsInfo) => {
   let map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: obj
    })

    let marker = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
    })
    marker.setMap(map)

    let markers = locationsInfo.map(place => {
        return new google.maps.Marker({
            position: place.position,
            map: map,
            title: place.name
        })
    })
}
window.addEventListener('load',getLocations)