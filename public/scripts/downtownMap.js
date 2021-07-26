
mapboxgl.accessToken = "pk.eyJ1IjoibGF1cmVuLWhhcm1vbiIsImEiOiJja3F3dHd4enEwM3cxMm9vN2dtZmNsc3B2In0.y-Ru-O-nK-vQak9_JWF3KQ";

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-90.1906262121751, 38.62601777884819], // starting position [lng, lat]
    zoom: 13 // starting zoom
});


map.on('load', function () {

    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    /////////////////////////////////////////////////////////outline info and stuff
    map.addSource('downtown', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                // These coordinates outline Maine.
                'coordinates': [
                    [
                        [-90.18152815993554, 38.63392972799027],
                        [-90.18221480538759, 38.62940393175311],
                        [-90.18264395879511, 38.627358848628475],
                        [-90.18375975765468, 38.62440846200433],
                        [-90.18757922298165, 38.61465120545778],
                        [-90.1929865559165, 38.617132558063204],
                        [-90.19341570932403, 38.61709902684334],
                        [-90.20156962406705, 38.61877556863349],
                        [-90.19538981499866, 38.63540474058428],
                        [-90.18702132355187, 38.63382915784456],
                        [-90.1850043025365, 38.634231437580894],
                        [-90.18144232925403, 38.63396325134082]
                    ]
                ]
            }
        }
    });

    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'downtown',
        'type': 'fill',
        'source': 'downtown', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': '#8D99AE', // blue color fill
            'fill-opacity': 0.3
        }
    });
    // Add a black outline around the polygon.
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'downtown',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 1
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////sites map layers and info

    map.addSource('sites', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: sites,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });



    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'sites',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Green, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': "#EF233C",
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15, //pixels
                10, //step
                20, //next pixels
                25, //next step
                25 //largest pixels
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'sites',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14
        },
        paint: {
            'text-color': 'white'
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'sites',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#EF233C',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        }
    });

    map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('sites').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'unclustered-point', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.popUpInfo;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'unclustered-point', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    map.on('click', 'unclustered-point', function (e) {
        const features = e.features[0].properties.clickDisplay;
        document.getElementById("selected").innerHTML = `${features}`;
    })
});
