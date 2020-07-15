const GOOGLE_API_KEY = '*********************';

export function getCoordsFromAddress(address) { //google geocoding API

    const urlAddress = encodeURI(address); //urlFriendly string -> now we can inject at the url below

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`).then(response => { //we are returning here because we must return a promise so we can wait for it where called

        if (!response.ok) {//if the response is not ok
            throw new Error('Failed to fetch coordinates. Please try again!');
        } else {
            return response.json();//change the address key and you will see the difference
        }

    }).then(data => {

        if (data.error_message) { //google thing, can have a 200 status code but if it has .error_message prop theres an error
            throw new Error(data.error_message);//change the API key and you will see the difference
        }

        const coordinates = data.results[0].geometry.location; //as shown in googlemaps Geocoding API you can also console.log it

        return coordinates;

    });
};

//NOW WITH A ASYNC AWAIT APPROACH

export async function getAddressFromCoordinates(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch coordinates. Please try again!');
    }
    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    const address = data.results[0].formatted_address;

    return address;
}




