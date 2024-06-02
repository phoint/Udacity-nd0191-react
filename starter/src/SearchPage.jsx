import { useCallback, useEffect, useState } from "react";
import BookList from "./BookList";
import * as BookAPI from "./BooksAPI";
import { Link } from "react-router-dom";

function SearchPage({myBooks, arrangedShelves, onShelfChange}) {
  const [keyword, setKeyword] = useState("")
  const [searchResult, setSearchResult] = useState([]);
  const [shelves, setShelves] = useState({})

  const handleNewChange = useCallback(() => {
    const getSearchResult = async (searchKey) => {
      if (searchKey) {
        console.log("Searching Books...")
          const res = await BookAPI.search(searchKey, 10);
          return res;
        }
        return []
      }
      return getSearchResult(keyword)
  }, [keyword])

  useEffect(() => {
    setShelves(arrangedShelves);
    const getResult = async () => {
      const res = await handleNewChange();
      return res;
    }
    console.log("Search and render")
    const findExistBooks = (currentBooks) => (searchBook) => currentBooks.filter((bk) => bk.id === searchBook.id).pop();
    const getExistBook = findExistBooks(myBooks);
    const mapResult = async (findBooks) => {
      const result = await getResult();
      if (result && !result.error) {
        const mappedResult = result.map((item) => {
          const existBook = findBooks(item);
          if (existBook) {
            return existBook;
          } else {
            item.shelf = "none";
            return item;
          }
        });
        console.log("Search result: ", mappedResult);
        setSearchResult([...mappedResult]);
      }}
    mapResult(getExistBook);
  }, [myBooks, arrangedShelves, handleNewChange])
    
  console.log("Arranged Shelves: ", shelves)
  const searchBooks = (event) => {
    setTimeout(() => setKeyword(event.target.value), 300);
  }

  const arrangeBooksInShelves = (updatedShelf, updateMyBooks) => {
    onShelfChange(updatedShelf, updateMyBooks)
  }

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          reloadDocument
          to="/"
          className="close-search"
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={searchBooks}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookList shelf={"none"} books={myBooks} searchResult={searchResult} inShelf={shelves} handleShelfChanging={arrangeBooksInShelves} />
      </div>
    </div>
  )
}

export default SearchPage