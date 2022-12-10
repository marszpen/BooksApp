'use strict'

const select = {
    templateOf: {
        book: '#template-book',
    },
    
    booksPanel: {
        panel: '.books-panel',
        list: '.books-list',

    book: {
        image: '.book__image',
    }
    }
}

const cover = {
    favorite: 'favorite',
}


const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
}

function render() {
    for(let book of dataSource.books){
        const generatedHTML = templates.booksTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.booksPanel.list);
        bookContainer.appendChild(generatedDOM);
    }
}
const favoriteBooks = [];
console.log('favoriteBooks', favoriteBooks);

function initActions(){
    const books = document.querySelectorAll(select.book.image);

    for(let book of books){
        book.addEventListener('dbclick', function(event){
        event.preventDefault();
        
        const bookId = book.getAttribute('data-id');
        favoriteBooks.push(bookId);
        console.log(book, favoriteBooks);

        if(!favoriteBooks.includes(bookId)){
            book.classList.add(cover.favorite);
            favoriteBooks.push(bookId);
        }
        else if(favoriteBooks.includes(bookId)){
            book.classList.remove(cover.favorite);
            const removeId = favoriteBooks.indexOf(cover.favorite);
            favoriteBooks.splice(removeId, 1);
        }
    });
}
}

render();
initActions();