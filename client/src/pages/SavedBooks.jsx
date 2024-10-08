import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../queries';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;

  const { me } = data;

  return (
    <div>
      <h2>Saved Books</h2>
      {me.savedBooks.map((book) => (
        <div key={book.bookId}>
          <h3>{book.title}</h3>
          <img src={book.image} alt={book.title} />
          <p>{book.description}</p>
          {/* Add remove book logic here */}
        </div>
      ))}
    </div>
  );
};

export default SavedBooks;
