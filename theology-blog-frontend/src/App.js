import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import Discussion from './Discussion';
import FAQ from './FAQ';
import Passage from './Passage';
import './App.css'; // Make sure you import the CSS file

function App() {
   
    return (
    <Router>

    
      <div className="tabs">
        <ul className="tab-list">
          <li className="tab-item"><Link to="/login" className="tab-link">Login</Link></li>
          <li className="tab-item"><Link to="/discussion" className="tab-link">Discussion</Link></li>
          <li className="tab-item"><Link to="/faq" className="tab-link">FAQ</Link></li>
          <li className="tab-item"><Link to="/passage" className="tab-link">Passage</Link></li>
        </ul>

        {/* Replace Switch with Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/passage" element={<Passage />} />
        </Routes>
      </div>

      <div className="homepage">
      <h1>L      O      G      O      S</h1>
      {/* Your other content */}
    </div>
    </Router>
  );
}

export default App;
