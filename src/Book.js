import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Book extends Component{
  
    handleChange = (event)=>{
        
        this.props.handleMoveToShelf(this.props.id, event.target.value)
        .then(()=>{
          
          if(this.props.onShelfChange){
          this.props.onShelfChange();
        }
        
        })
        
    }
    render(){
        const {image, title, authors, shelf} = this.props
        return(
            <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url('${image}')` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={shelf} onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">{shelf=== 'currentlyReading' && ("✔")} Currently Reading</option>
                                <option value="wantToRead">{shelf === 'wantToRead' && ("✔")} Want to Read</option>
                                <option value="read">{shelf === 'read' && ("✔")} Read</option>
                                <option value="none">{shelf !== 'currentlyReading' && shelf !== 'read' && shelf !== 'wantToRead' && ("✔")} None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{title}</div>
                          <div className="book-authors">
                              {authors}
                            </div>
            </div>
        )
    }
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  authors: PropTypes.array,
  shelf: PropTypes.string,
  handleMoveToShelf: PropTypes.func.isRequired,
  onShelfChange: PropTypes.func
}
export default Book;