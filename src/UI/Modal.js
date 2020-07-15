export class Modal {
    constructor(contentId, fallbackMessage) {
        this.fallbackMessage = fallbackMessage;
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById('modal-template');
    }
    show() {
        if ('content' in document.createElement('template')) {//if content property exists in document.createElement('template') -> we are doing this because internet explorer doesnt support </template> tag
            const modalElements = document.importNode(this.modalTemplateEl.content, true); //creating a deep clone of the element choosen on the consntructor

            this.modalElement = modalElements.querySelector('.modal');
            this.backdropElement = modalElements.querySelector('.backdrop');

            const contentElement = document.importNode(this.contentTemplateEl.content, true);

            this.modalElement.appendChild(contentElement);

            document.body.insertAdjacentElement('afterbegin', this.modalElement);
            document.body.insertAdjacentElement('afterbegin', this.backdropElement);

        } else {
            //fallback code
            alert(this.fallbackMessage);
        }
    }

    hide() {
        if(this.modalElement){
            document.body.removeChild(this.modalElement); //OR this.modalElement.remove();
            document.body.removeChild(this.backdropElement);
            this.modalElement = null; //to make clear that this is reset and we dont need those info anymore. This is to avoid memory leaking
            this.backdropElement = null;
        }
     }
}