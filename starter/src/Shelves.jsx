import { useEffect, useState } from "react";
import BookList from "./BookList";
import { Link } from "react-router-dom";

/**
* @description Represents all shelves in main page
* @constructor
* @param {array} myShelves - a list of Shelf
* @param {array} myBooks - a list of current book
* @param {object} arrangedShelves - the shelves' name followed with list of book id
* @param {function} onShelfChange - the event represent the updating action
*/
function Shelves({ myShelves, myBooks, arrangedShelves, onShelfChange }) {
  const [currentShelves, setCurrentShelf] = useState({})

  const arrangeBooksInShelves = (updatedShelf, updateMyBooks) => {
    onShelfChange(updatedShelf, updateMyBooks)
  }

  useEffect(() => {
    setCurrentShelf(arrangedShelves)
  }, [arrangedShelves])

  console.log(currentShelves)
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {myShelves.map((shelf) => {
          const bookList = currentShelves[shelf.id]
          console.log("BookList: ", bookList)
          return (
            <div className="bookshelf" key={shelf.id}>
              <h2 className="bookshelf-title">{shelf.description}</h2>
              <div className="bookshelf-books">
                {bookList && <BookList shelf={shelf.id} books={myBooks} inShelf={currentShelves} handleShelfChanging={arrangeBooksInShelves} />}
              </div>
            </div>
          )
        })}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default Shelves;

