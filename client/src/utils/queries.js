import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
export const bookSearch = gql`
  query bookSearch($searchTerm: String!) {
    bookSearch(searchTerm: $searchTerm) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;
