import { Modal } from './UI/Modal'; //we use a named import here, because we are using a named exporting at Modal.js
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoordinates } from './Utility/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this)); //this must be bind because we are using this keyword inside of locateUserHandler()
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler); //just get the URL and stores in your CTRL-C (its like an auto crtl c)
    }

    sharePlaceHandler(){
        const sharedLinkInputElement = document.getElementById('share-link');

        if(!navigator.clipboard){ //if clipboard is not available at least we are auto selecting the string
            sharedLinkInputElement.select(); 
            return;
        }
        navigator.clipboard.writeText(sharedLinkInputElement.value).then(()=>{
            alert('Copied into clipboard!');
        }).catch(err =>{
            console.log(err);
        });
    }

    selectPlace(coordinates, address) {
        if (this.map) { //if a map exists just re-render it
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
        this.shareBtn.disabled = false; //enable the button 
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;//location.origin gets your origin path http://localhost:8080/
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('Location feature is not available in your browser version :(');
            return;
        }

        const modal = new Modal('loading-modal-content', 'Loading User Location...');
        modal.show();

        navigator.geolocation.getCurrentPosition(async successResult => {//we must place the async keyword in the direct parent function you are using it only

            const coordinates = {
                lat: successResult.coords.latitude,
                lng: successResult.coords.longitude
            };



            // console.log(coordinates);

            const address = await getAddressFromCoordinates(coordinates);
            console.log(address);
            modal.hide();
            this.selectPlace(coordinates, address);


        }, err => {
            modal.hide();
            alert('Could not locate you unfortunately. Please enter an address manually!')
        });
    }

    findAddressHandler(event) {
        event.preventDefault();//prevent the default of submit a form -> send a request to the server
        const address = event.target.querySelector('input').value; //here we are filtering -> event.target (form) -> input -> value's input
        if (!address || address.trim().length === 0) {
            alert('Invalid address entered');
            return;
        } else {
            const modal = new Modal('loading-modal-content', 'Loading User Location...');
            modal.show();
            getCoordsFromAddress(address).then(coordinates => {
                console.log(coordinates);
                this.selectPlace(coordinates, address);
                modal.hide();
            }).catch(err => {
                alert(err.message);
            });

        }

    }
};


new PlaceFinder();