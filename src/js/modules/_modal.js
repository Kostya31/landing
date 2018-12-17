
export class Modals {

    constructor(){
        this.modalClass = '.modal';
        this.modals = [];
        this.createModals();
        console.log("3333333", this.modals);
    };

    createModals(){
        document.querySelectorAll(this.modalClass)
            .forEach(function (el) {
                this.modals.push(new Modal(el))
            })
    }
}

class Modal {
    constructor(element){
        this.element = element;
    }
}