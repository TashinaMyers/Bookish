import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import SavedBooks from './components/SavedBooks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <Router> */}
      {/* <Routes>
          <Route exact path="/" element={<SearchBooks/>} />
          <Route exact path="/saved" component={SavedBooks} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
      </Routes> */} 
      {/* </Router> */}
      < Outlet />
    </ApolloProvider>
  );
}

export default App;


//Nav on 23, Footer on 26