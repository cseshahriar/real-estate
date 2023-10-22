import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/main.scss';

import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import Listings from './containers/Listings';
import ListingDetail from './containers/ListingDetail';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import NotFound from './components/NotFound';
import Layout  from './hocs/Layout';


import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Layout>
    </Router>
    </Provider>
  );
}

export default App;