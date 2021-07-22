 
mapboxgl.accessToken = "pk.eyJ1IjoibGF1cmVuLWhhcm1vbiIsImEiOiJja3F3dHd4enEwM3cxMm9vN2dtZmNsc3B2In0.y-Ru-O-nK-vQak9_JWF3KQ";

const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-90.184776,38.624691], // starting position [lng, lat]
zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker()
    .setLngLat([-90.184776,38.624691])
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl(), "bottom-left");