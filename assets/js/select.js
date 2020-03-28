$(document).ready(function () {
	console.log("document ready");

	var dist = "Thiruvananthapuram"
	console.log(dist);
	$("#locality").empty();

	$("#locality").append("--Select--");

	districtMap[dist].forEach(x => {
		$("#locality").append(new Option(x, x));
	});

	myMap = map(695001);

	$("#pincode").change(function() {
		console.log('change')
		let pin = $("#pincode").val();
		if(Object.keys(pinlookup).includes(pin)){
			panMapTo(pin);
			return;
		}
	});


	$("#location").click(function() {
		let pin = $("#pincode").val();
		if(!Object.keys(pinlookup).includes(pin)){
			alert("Please enter correct Pincode first.\nദയവായി ശരിയായ പിൻകോട് ആദ്യം നൽകുക");
			return;
		}
		mymap = map(pin)
	})
	
	/*states.forEach(state => {
		$("#state").append(new Option(state, state));
	});*/

	// districts.forEach(d => {
	// 	$("#district").append(new Option(d, d.split('-')[0]));
	// });

	// $("#district")
	// .change(function() {
	// 	// var dist = $("#district").val();
	// 	var dist = "Thiruvananthapuram"
	// 	console.log(dist);
	// 	$("#locality").empty();

	// 	$("#locality").append("--Select--");

	// 	districtMap[dist].forEach(x => {
	// 		$("#locality").append(new Option(x, x));
	// 	});
	// });
});

function panMapTo(map, pincode){
	latlon = pinlookup[pincode]
	map.panTo(new L.LatLng(latlon[0], latlon[1]))
}

function map(pincode) {

    latlon = pinlookup[pincode]
    var mymap = L.map('mapid').setView([latlon[0], latlon[1]], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWt1bHNhbnRob3NoIiwiYSI6ImNrOGFud293bjAzeHozaHFwbjB4c2dhamYifQ.J1DC01Kvdt2GfU89Rc1nqg'
    }).addTo(mymap);

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("This location selected. (ഈ സ്ഥലം തിരഞ്ഞെടുത്തിരിക്കുന്നു)")
            .openOn(mymap);
		var cords = e.latlng.lat + ',' + e.latlng.lng;
		$("#loc").val(cords);
        console.log(cords)
    }

	mymap.on('click', onMapClick);
	
	return mymap;
}
