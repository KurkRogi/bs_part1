const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const locations = [
        {lat: 40.785091, lng: -73.968285,},
        {lat: 41.08, lng: -73.87},
        {lat: 40.75, lng: -73.98},
];

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 46.62, lng: -33.13 },
    });

    // Add markers to the markers array, but this will NOT place them on the map yet!
    const markers = locations.map((position, i) => {
        const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
        position: position,
        label: label,
        });
        return marker;
    });

    // Add a marker clusterer to manage the markers in markers array AND place them on the map now.
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
}