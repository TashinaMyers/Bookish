const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    books: async () => {
      return await Book.find();
    },
    book: async (parent, { bookId }) => {
      return await Book.find();
    },
    bookSearch: async (parent, { searchTerm }) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.VITE_GOOGLE_KEY}`
        );
        const result = await res.json();
        console.log(result);
        const items = result.items || [];
        return items.map((book) => {
          const bookId = book.id;
          const authors = book.volumeInfo.authors || ["No author to display"];
          const description =
            book.volumeInfo.description || "No description to display";
          const title = book.volumeInfo.title;
          const image =
            book.volumeInfo.imageLinks?.thumbnail || "No image to display";
          const link = book.volumeInfo.previewLink;
          return { bookId, authors, description, title, image, link };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (
      parent,
      { bookId, authors, description, title, image, link },
      context
    ) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          {
            $addToSet: {
              savedBooks: { bookId, authors, description, title, image, link },
            },
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
