'use strict';
const select = {
  templateOf: {
    book: '#template-book',
  },
    
  booksPanel: {
    panel: '.books-panel',
    list: '.books-list',

    book: {
      image: '.book__image',
      rating: '.book-list .book__raiting'
    }
  },
  filtersForm: '.filters'
};

const cover = {
  favorite: 'favorite',
};


const templates = {
  booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

class BooksList {
    constructor(element){
        const thisBook = this;
        
        thisBook.render();
        thisBook.initActions();
        thisBook.filterBooks();
    }

    render() {
        const thisBook= this;
        for(let book of dataSource.books){
            const rating = book.determinateRatingBgc(book.rating);
            console.log(ratingBgc);
            const ratingWidth = book.rating;
            console.log('ratingWidth', ratingWidth);
        }
    }

    getElements(){
            const generatedHTML = templates.booksTemplate(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const booksList = document.querySelector(select.booksPanel.list);
            const filtersForm = document.querySelector(select.filtersForm)
            booksList.appendChild(generatedDOM);
        
    
            const favoriteBooks = [];
            const filters = [];

            console.log('favoriteBooks', favoriteBooks);
    }

    initActions(){
    const thisBook = this;
    //const booksList = document.querySelector(select.booksPanel.list);

    booksList.addEventListener('dblclick', function(event) {
        event.preventDefault();

        const clickedElement = event.target;

        if(clickedElement.tagName === 'IMG') {
    
        const book = clickedElement.offsetParent;
        const bookId = book.getAttribute('data-id');
        
        if(!favoriteBooks.includes(bookId)){
            book.classList.add(cover.favorite);
            favoriteBooks.push(bookId);
        }
        else if(favoriteBooks.includes(bookId)){
            book.classList.remove(cover.favorite);
            const removeId = favoriteBooks.indexOf(cover.favorite);
            favoriteBooks.splice(removeId, 1);
        }
        }
    });


    //const filtersForm = document.querySelector(select.filtersForm);
    filtersForm.addEventListener('change', function(event) {
        const checked = event.target.checked;
        if(checked) {
            filters.push(event.target.value);
        }
        else {
            const removeId = favoriteBooks.indexOf(event.target);
            filters.splice(removeId, 1);
        }
    });
}

    filterBooks() {
    const thisBook = this;

    for(let book of dataSource.books){
        const bookElem = document.querySelector('[data-id="' + book.id + '"]');
        bookElem.classList.remove('hidden');

        for(let filter of filters) {
            if (book.details[filter] === false) {
                bookElem.classList.add('hidden');
                break;
            }
        }
    }
}

    determineRatingBgc (rating){
        const thisBook = this;

        let ratingBgc = '';
        if (rating < 6) {
            ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
        } else if (rating > 6 && rating <= 8) {
            ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
        } else if (rating > 8 && rating <= 9) {
            ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
        } else if (rating > 9) {
            ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
        }

        return ratingBgc;
        }

}

const app = new BooksList();
app.init();