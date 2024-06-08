import React from 'react';

const BookCard = ({ book, addToBookshelf, isAdded }) => {
  return (
    <div className="book-card">
      <p> <span className='edition_count'>Book title</span>  {book.title}</p>
      {/* <p>Author: {book.author_name?.join(', ') || 'Unknown'}</p> */}
      <p> <span className='edition_count'> Edition Count:</span>  {book.edition_count}</p>
      {!isAdded && (
        <button onClick={() => addToBookshelf(book)} className='btn'> Add to Bookshelf</button>
      )}
    </div>
  );
};

export default BookCard;
