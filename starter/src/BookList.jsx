import Book from "./Book";
import { useState, useEffect } from "react";

/**
* @description Represents a list of book in a shelf or search result
* @constructor
* @param {string} shelf - the shelf name of this list
* @param {array} books - a list of current book
* @param {array} searchResult - a list of book from search result
* @param {object} inShelf - the shelves' name followed with list of book id
* @param {function} handleShelfChanging - the event represent the updating action
*/
function BookList({ shelf, books, searchResult, inShelf, handleShelfChanging }) {
  const [booksInShelf, setBookInShelf] = useState([])
  const [bookDisplay, setBookDisplay] = useState([])


  useEffect(() => {
    console.log("Render BookList")
    if (inShelf && Object.keys(inShelf).includes(shelf)) {
      setBookInShelf(inShelf[shelf])
      setBookDisplay(books)
    } if (searchResult && !Object.keys(inShelf).includes(shelf)) {
      setBookInShelf(searchResult.map(bk => bk.id))
      setBookDisplay(searchResult)
    }
    return () => setBookInShelf([])
  }, [books, shelf, inShelf, searchResult])

  const handleBookListChanging = (updatedShelf) => {
    const updateNewShelves = () => {
      const newShelves = {
        ...inShelf
      }
      if (Object.keys(newShelves).includes(updatedShelf.origin)) {
        const index = newShelves[updatedShelf.origin].indexOf(updatedShelf.book.id)
        if (index > -1) {
          newShelves[updatedShelf.origin].splice(index, 1)
        }
      }
      if (Object.keys(newShelves).includes(updatedShelf.new)) {
        newShelves[updatedShelf.new].push(updatedShelf.book.id)
      }
      return newShelves;
    }
    const updateMyBooks = () => {
      let newBooks = [...books];
      const index = books.map((bk) => bk.id).indexOf(updatedShelf.book.id);
      console.log("Index of new Book: ", index);
      if (index > -1) {
        if (updatedShelf.new === "none") {
          newBooks.splice(index, 1);
        } else {
          newBooks.splice(index, 1, updatedShelf.book);
        }
      }
      if (updatedShelf.origin === "none") {
        newBooks = [...books, updatedShelf.book];
      }
      return newBooks;
    }
    handleShelfChanging(updateNewShelves, updateMyBooks)
  }
  const bookList = bookDisplay.filter((book) => booksInShelf.includes(book.id));
  return (
    <ol className="books-grid">
      {bookList && bookList.map((book) => {
        return (
          <li key={book.id}>
            <Book shelf={shelf} book={book} shelfChanged={handleBookListChanging} />
          </li>
        )})
      }
    </ol>
  )
}

export default BookList;