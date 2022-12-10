'use strict'

const select = {
    templateOf: {
        book: '#template-book';
    
    booksPanel:
        panel: ".books-panel";
        list: ".book-list";
    }
}


const temlate = {
    booksTemplate: Handelbars.complie(document.querySelector(select.templateOf.book).innerHTML),
}

/*function templateBook(id,data){
const fromData = utils.createDOMFromHTML
}

templateBook();*/