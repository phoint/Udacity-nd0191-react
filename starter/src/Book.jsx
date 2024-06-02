import { useEffect, useState } from "react";
import * as BookAPI from "./BooksAPI";


/**
* @description Represents a book
* @constructor
* @param {string} shelf - the shelf name which this book's belong to
* @param {object} book - the information of this book
* @param {function} shelfChanged - the event represent the updating action
*/
function Book({shelf, book, shelfChanged}) {
  const [currentShelf, setCurrentShelf] = useState(book.shelf)

    const handleShelfChange = (event) => {
        const updateBookShelf = async () => {
          const updatedBook =  {
            book: {...book, shelf:event.target.value},
            origin: book.shelf,
            new: event.target.value
          }
          console.log("Updating Book: ", updatedBook)
          shelfChanged(updatedBook)
          const updatedShelves = await BookAPI.update(book, event.target.value)
          console.log("Update bookshelf: ", updatedShelves)
          setCurrentShelf(event.target.value)
        }
        updateBookShelf();
    }

    useEffect(() => {
      setCurrentShelf(book.shelf)
      return () => setCurrentShelf("")
    },[shelf, book.shelf])

    return (
        <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                  width: 128,
                  height: 192,
                  backgroundImage:
                    `url(${book.imageLinks && book.imageLinks.thumbnail})`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select value={currentShelf} onChange={handleShelfChange}>
                    <option disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">
                        Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
            </div>
    )
}

export default Book;