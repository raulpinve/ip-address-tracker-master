
function apiCall (ip){

    document.getElementById("loader").style.display ="block";
    document.getElementById("ip-table-elements").style.display ="none";

    http_request = new XMLHttpRequest();
    http_request.onreadystatechange = function(){
        if(this.readyState == 4 ){

            if(this.status == 200){
                var data = JSON.parse(this.responseText);  
                showMap(data.location.lat, data.location.lng, data.isp, data.location.city, data.location.region); 
                showInfo(data.ip, data.location.city + ", " + data.location.country, data.location.timezone, data.isp);
            }else{
                showMap("", "", "No data", "No data", "No data"); 
                showInfo("---", "---", "---", "---");
            }            

            document.getElementById("loader").style.display ="none";
            document.getElementById("ip-table-elements").style.display ="grid";
        }
        

    }
    http_request.open('GET', 'https://geo.ipify.org/api/v1?apiKey=at_zAz80MBn8sIHdJ1BmrwaBOGnq71KI&ipAddress=' + ip + '&domain=' + ip, true);
    http_request.send();
}

function showMap(lat, lon, city, country){

    map.setView([lat, lon], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([lat, lon]).addTo(map)
        .bindPopup(city + ', ' + country)
        .openPopup();
}

function showInfo(ip, location, timezone, isp){

    var ipNode = document.getElementById("ip")
    var locationNode = document.getElementById("location")
    var timezoneNode = document.getElementById("timezone")
    var ispNode = document.getElementById("isp")

    ipNode.innerHTML = ip
    locationNode.innerHTML = location
    timezoneNode.innerHTML = timezone
    ispNode.innerHTML = isp
}

//consultar API
var map = L.map('map-section', {zoomControl:false})
var ipHeaderForm = document.getElementById("ip-header-form");
var APIconsultarInput = document.getElementById("APIconsultarInput");

ipHeaderForm.addEventListener("submit", function(e){
    e.preventDefault();
    apiCall(APIconsultarInput.value);
})

apiCall("");