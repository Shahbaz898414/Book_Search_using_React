import React, { useState } from 'react';
import BookCard from './BookCard';

const BookSearch = ({ addToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [addedBooks, setAddedBooks] = useState([]);
  const [error, setError] = useState(null);

  const searchBooks = async (query) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      const data = await response.json();
      setBooks(data.docs);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setError('Failed to fetch books. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      searchBooks(value);
    } else {
      setBooks([]);
    }
  };

  const handleAddToBookshelf = (book) => {
    addToBookshelf(book);
    setAddedBooks([...addedBooks, book.key]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className='input-size'
      />
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="book-results">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              addToBookshelf={handleAddToBookshelf}
              isAdded={addedBooks.includes(book.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
