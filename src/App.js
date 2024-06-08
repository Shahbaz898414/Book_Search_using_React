import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/Bookshelf';
import './App.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">
            < button className='btn size'> {"<"} Search Books page </button> 
          </Link>
          <Link to="/bookshelf">
              <button className='btn size'>My Bookshelf</button> 
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<BookSearch addToBookshelf={addToBookshelf} />} />
          <Route path="/bookshelf" element={<Bookshelf books={bookshelf} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
