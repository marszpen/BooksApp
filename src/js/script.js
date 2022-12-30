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
        thisBook.element = element;
        thisBook.filtersForm = document.querySelector(select.filtersForm);
        thisBook.filters = [];
        thisBook.favoriteBooks = [];
        
        thisBook.render();
        thisBook.initActions();
        thisBook.filterBooks();
    }

    render() {
        const thisBook = this;
        for(let book of dataSource.books){
            const ratingBgc = thisBook.determineRatingBgc(book.rating);
            const ratingWidth = book.rating * 10;
            book.ratingWidth = ratingWidth;
            book.ratingBgc = ratingBgc;
            
            const generatedHTML = templates.booksTemplate(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            thisBook.element.appendChild(generatedDOM);
        }
    }


    initActions(){
        const thisBook = this;
    
        thisBook.element.addEventListener('dblclick', function(event) {
            event.preventDefault();

            const clickedElement = event.target;

            if(clickedElement.tagName === 'IMG') {
    
                const book = clickedElement.offsetParent;
                const bookId = book.getAttribute('data-id');
        
                if(!thisBook.favoriteBooks.includes(bookId)){
                    book.classList.add(cover.favorite);
                    thisBook.favoriteBooks.push(bookId);
                }
                else {
                    book.classList.remove(cover.favorite);
                    const removeId = thisBook.favoriteBooks.indexOf(cover.favorite);
                    thisBook.favoriteBooks.splice(removeId, 1);
                }
            }
        });

        thisBook.filtersForm.addEventListener('change', function(event) {
            if (event.target.name !== "filter")
                return false;
            
            const checked = event.target.checked;
            if(checked) {
                thisBook.filters.push(event.target.value);
            }
            else {
                const removeId = thisBook.filters.indexOf(event.target);
                thisBook.filters.splice(removeId, 1);
            }

            thisBook.filterBooks();
        });
    }

    filterBooks() {
        const thisBook = this;
        for(let book of dataSource.books){
            const bookElem = document.querySelector('[data-id="' + book.id + '"]');
            bookElem.classList.remove('hidden');

            for(let filter of thisBook.filters) {
                if (book.details[filter] === false) {
                    bookElem.classList.add('hidden');
                    break;
                }
            }
        }
    }

    determineRatingBgc (rating){
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

const app = new BooksList(document.querySelector(select.booksPanel.list));
