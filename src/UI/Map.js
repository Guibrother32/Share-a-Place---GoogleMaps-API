export class Map {
    constructor(coords) {
        // this.coordinates = coords;
        this.render(coords);
    }
    render(coordinates) {
        if (!google) { //we should have access this via the googles script
            alert('Could not load maps library');
            return;
        }

        const map = new google.maps.Map(document.getElementById('map'), { center: coordinates, zoom: 16 }); //we are creating a new map (where the map will sit, configuring other props)

        new google.maps.Marker({ //configuring the google pin and specifying the map
            position: coordinates,
            map: map
        });
    }
}