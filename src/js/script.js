'use strict'

const select = {
    templateOf: {
        book: '#template-book',
    },
    
    booksPanel: {
        panel: ".books-panel",
        list: ".books-list",

    book:{
        image: ".book_image",
    }
    }
}


const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
}

function render() {
    for(let book of dataSource.books){
        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.booksPanel.list);
        bookContainer.appendChild(generatedDOM);
    }
}

render();