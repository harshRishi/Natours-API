/*eslint-disable*/
export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyc2hyaXNoaSIsImEiOiJja3U1NDdrdDIwNDRrMndvN3FrZTY4Nm12In0.3KtACY-idOLIg-GvypGvjQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/harshrishi/cku54r2881wzf18l6s2s6f3mn',
        scrollZoom: false
        // center: [-118.113491, 34.111745],
        // zoom: 10,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);

        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}

