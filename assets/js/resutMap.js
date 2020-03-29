$(document).ready(function () {
    console.log("document ready");
    
    let pincode = $("#pincode").text();
    let coordinates = $("#coordinates").text();

    coordinates = coordinates.split(' ,')

    map = shopmap(pincode, coordinates)
});



function shopmap(user_pincode, shops_coordinates) {
    latlon = pinlookup[user_pincode]
    console.log(latlon)

    var map = L.map('map').setView([latlon[0], latlon[1]], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWt1bHNhbnRob3NoIiwiYSI6ImNrOGFud293bjAzeHozaHFwbjB4c2dhamYifQ.J1DC01Kvdt2GfU89Rc1nqg'
    }).addTo(map);

    shops_coordinates.forEach(element => {
        const latlon = element.split(",")
        try {
            L.marker([latlon[0], latlon[1]]).addTo(map);
        } catch (error) {
            console.log(error);
        }
        
    });

    return map
}

// map = shopmap(695581, ["8.5610783,76.88939069999999", "8.569511,76.888089"])

function zoomto(map, coordinate) {
    const latlon = coordinate.split(",")
    map.flyTo([latlon[0], latlon[1]], 15);
}
