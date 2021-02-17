import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import {search} from './BooksAPI';
class SearchPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            search: '',
            filteredBooks: []
        }
    }
 
    handleChange = (e)=>{
        this.setState({
            search: e.target.value
        });
        search(e.target.value)
        .then((booksData)=>{
            if(Array.isArray(booksData) && booksData.length > 0){
                this.setState({
                    filteredBooks: booksData.filter(b=>b.imageLinks)  
                }) 
            }else{
                this.setState({
                    filteredBooks: []
                })
            }
           this.SyncChanges();
        });

    }

    //add property shelf to book's state to see it's current shelf checked on searchPage when the shelf changed
    SyncChanges= ()=>{
        this.setState(prevState=>{
            this.props.booksOnShelves.forEach(book => {
                prevState.filteredBooks.forEach(b =>{
                    if(b.id === book.id){
                        b.shelf = book.shelf
                    }
                })
            });
            return {
                filteredBooks: prevState.filteredBooks
            }
        })

    }

    render(){
        const {filteredBooks, search} = this.state
        return(
            <div className="search-books">
            <div className="search-books-bar">
                <Link to='/'>
                <button className="close-search">Close</button>
                </Link>
              
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text"
                value={search} 
                placeholder="Search by title or author"
                onChange={this.handleChange}
                />

              </div>
            </div>
            <div className="search-books-results">
                {filteredBooks === [] || filteredBooks.length < 1
                ? <center><h5>No results found!</h5></center>
                :
                <ol className="books-grid">
                  {filteredBooks.map((book)=>(
                      <li key={book.id}>
                          <Book 
                          onShelfChange={this.SyncChanges}
                          handleMoveToShelf={this.props.onMoveToShelf} 
                          id={book.id} 
                          title={book.title} 
                          image={book.imageLinks.thumbnail} 
                          authors={book.authors} 
                          shelf={book.shelf} />
                      </li>
                      
                  ))}
              </ol>
            }
              
            </div>
          </div>
        )
    }
}
export default SearchPage;