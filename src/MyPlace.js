import { Map } from './UI/Map';

class LoadedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headerTitlteEl = document.querySelector('header h1');
        headerTitlteEl.textContent = address;
    }
}

const url = new URL(location.href);//location.href -> the current path

const queryParams = url.searchParams; //extract the queryParams

const coords = { //must be a number, here two different ways to achieve it
    lat: parseFloat(queryParams.get('lat')),
    lng: +queryParams.get('lng')
}

const address = queryParams.get('address'); //this will automatically convert it to a human reading string

new LoadedPlace(coords, address);