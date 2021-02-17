import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import {Link, Route} from 'react-router-dom'
import SearchPage from './SearchPage'
import {getAll, update, get} from './BooksAPI'
class BooksApp extends Component {
  constructor(props){
    super(props)
    this.state = {
    books: [],
    shelves: [
      {name: "currentlyReading", value:"Currently Reading"},
      {name: "wantToRead", value: "Want To Read"},
      {name: "Read", value: "Read"}
    ]
  }
  }
 
  componentDidMount(){
    getAll()
    .then((booksData)=>{
      this.setState({
        books: booksData
      })
    })
    
  }

  MyReads = ()=>(
    <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf, index)=>(
                  <Shelf onMoveToShelf={this.moveToShelf} key={index} shelf={shelf} books={this.state.books} />
                ))}
                
              </div>
            <div className="open-search">
              <Link to='/search'>
              <button>Add a book</button>
              </Link>
            </div>
          </div>
        </div>
  )
  
  /*
  This function move a book from one shelf to another one and if a book it isn't in a shelf,
   we just add to specified shelf  else we updated the book shelf
   */
  moveToShelf = async (bookId, shelf)=>{
    //Move the book to another shelf on the server
    update({id: bookId}, shelf);
    //Move the book to another shelf on the frontend if the book already belong to one 
    this.setState(prevState=>{
      let flag = false;
      prevState.books.forEach(b => {
        if(b.id === bookId){
          b.shelf = shelf
          flag = true
        }
      });
      //If the book is not belonging to one shelf, assign it to the specify shelf
      if(!flag){
        get(bookId)
        .then((bookData)=>{
          prevState.books.push(bookData)
        })
      }
      //update the state
      return {
        books: prevState.books
      }
    })    
  }

  render() {
    return (
    
      <div className="app">
          <Route
          exact
          path='/'
          render={this.MyReads}  />
          <Route
          path='/search'
          render={()=>(
            <SearchPage booksOnShelves={this.state.books} onMoveToShelf={this.moveToShelf} />
          )
          }/>
      </div>
      
    )
  }
}

export default BooksApp
