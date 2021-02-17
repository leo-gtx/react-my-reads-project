import React from 'react';
import Book from './Book';
function Shelf(props){
  const {shelf, books, onMoveToShelf} = props
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.value}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter((book)=>book.shelf.toLowerCase() === shelf.name.toLowerCase())
            .map((book)=>(
              <li key={book.id} >
                <Book
                handleMoveToShelf={onMoveToShelf} 
                id={book.id}
                title={book.title} 
                image={book.imageLinks ? book.imageLinks.thumbnail : undefined} 
                authors={book.authors} 
                shelf={book.shelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
}
export default Shelf;