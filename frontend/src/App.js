import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Candidate from './components/Candidates';
import Home from './components/Home'
import Navigation from './components/Navigation';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Candidate />} />
          <Route exact path="/candidates" element={<Home />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
