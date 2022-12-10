'use strict'

const select = {
    templateOf: {
        book: '#template-book',
    },
    
    booksPanel: {
        panel: ".books-panel",
        list: ".books-list",
    }
}


const templates = {
    booksTemplate: Handelbars.complie(document.querySelector(select.templateOf.book).innerHTML),
}

function render() {
    for(let book of dataSource.books){
        const generatedHTML = templates.book(dataSource);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.booksPanel.list);
        bookContainer.appendChild(generatedDOM);
    }
}

render();