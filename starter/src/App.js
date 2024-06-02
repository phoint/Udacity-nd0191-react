import "./App.css";
import Shelves from "./Shelves";
import SearchPage from "./SearchPage";
import { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import * as BookAPI from "./BooksAPI";

function App() {
  const [myBooks, setMyBooks] = useState([]);
  const [arrangedShelves, setArrangedShelves] = useState({})
  const [myShelves, setShelves] = useState([
    {
      id: "read",
      description: "Read"
    }, 
    {
      id: "currentlyReading",
      description: "Currently Reading"
    }, 
    {
      id: "wantToRead", 
      description: "Want To Read"
    }
  ]);

  const handleShelfChange = (updateShelves, updateBook) => {
    setMyBooks(updateBook())
    setArrangedShelves(updateShelves())
  };


  
  useEffect(() => {
    const getMyBooks = async () => {
      const res = await BookAPI.getAll();
      setMyBooks(res)
      arrangeBookToShelves(res)
    }

    const arrangeBookToShelves = (allBooks) => {
      console.log("MYBOOKS", allBooks)
      const filter = (bks) => (shelf) => bks.filter((b) => b.shelf === shelf);
      const filterBy = filter(allBooks);
  
  
      const theShelves = myShelves.map((shelf) => shelf.id)
        .reduce((result, id, index) => ({
          ...result,
          [id] : filterBy(id).map((bk)=> bk.id)
      }), {})
      setArrangedShelves(theShelves)
    }
    
    getMyBooks();
  }, [myShelves])
  console.log("Demo BookShelves: ", arrangedShelves)
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <Shelves myShelves={myShelves} myBooks={myBooks} arrangedShelves={arrangedShelves} onShelfChange={handleShelfChange}/>
        }/>
        <Route exact path="/search" element={
          <SearchPage myBooks={myBooks} arrangedShelves={arrangedShelves} onShelfChange={handleShelfChange}/>
        }/>
      </Routes>
    </div>
  );
}

export default App;
