import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import Listings from './containers/Listings';
import ListingsDetails from './containers/ListingsDetails';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

import Layout  from './hocs/Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingsDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;