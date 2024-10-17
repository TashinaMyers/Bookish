import React from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (book) => {
    const { bookId, authors, description, title, image, link } = book;
    try {
      await saveBook({
        variables: { bookId, authors, description, title, image, link },
      });
      // Update UI to reflect saved book status
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {/* Your search book input and result display logic here */}
      <p> Hello! </p>
    </div>
  );
};

export default SearchBooks;

