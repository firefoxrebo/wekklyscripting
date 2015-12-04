var locateMe = {

    geo: null,

    locationLink  : document.querySelector('a.locate'),
    locationMap   : document.querySelector('div.map'),
    locationLongitude: null,
    locationLatitude: null,
    locationLogInput: document.querySelector('input[name=longitude]'),
    locationLatInput: document.querySelector('input[name=latitude]'),

    init: function()
    {
        if(false === locateMe.isGeoLocationSupported()) {
            locateMe.locationMap.innerHTML = '<p>Sorry your browser doesn\'t support Geolocation</p>';
            return;
        }
        locateMe.geo = navigator.geolocation;
        locateMe.locationLink.addEventListener('click', locateMe.getCurrentPosition, false);
    },
    isGeoLocationSupported: function()
    {
        return ('geolocation' in navigator) ? true : false;
    },
    getCurrentPosition: function(e)
    {
        e.preventDefault();
        locateMe.geo.getCurrentPosition(locateMe.onSuccess, locateMe.onFailure);
        locateMe.locationMap.innerHTML = 'Detecting your location...';
    },
    onSuccess: function(position)
    {
        locateMe.locationMap.innerHTML = '';
        if(locateMe.setCoordinatesData(position.coords)) {
            locateMe.drawMap();
        }
    },
    onFailure: function(error)
    {

    },
    setCoordinatesData: function(coords)
    {
        if(typeof coords !== 'object') return false;

        locateMe.locationLatitude = locateMe.locationLatInput.value = coords.latitude;
        locateMe.locationLongitude = locateMe.locationLogInput.value = coords.longitude;
        return true;
    },
    drawMap: function()
    {
        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?" +
            "center=" + locateMe.locationLatitude + "," + locateMe.locationLongitude + "&zoom=16&size=300x300&scale=1" +
            "&markers=color:blue%7Clabel:S%7C" + locateMe.locationLatitude + "," + locateMe.locationLongitude + "&sensor=false";
        locateMe.locationMap.appendChild(img);
    }
}

locateMe.init();
