import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import Discussion from './Discussion';
import FAQ from './FAQ';
import Passage from './Passage';
import './App.css'; // Import CSS

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Wrap everything in app-container */}
        <nav className="tabs"> {/* semantic: use <nav> for nav items */}
          <ul className="tab-list">
            <li className="tab-item"><Link to="/login" className="tab-link">Login</Link></li>
            <li className="tab-item"><Link to="/discussion" className="tab-link">Discussion</Link></li>
            <li className="tab-item"><Link to="/faq" className="tab-link">FAQ</Link></li>
            <li className="tab-item"><Link to="/passage" className="tab-link">Passage</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/passage" element={<Passage />} />
          </Routes>

          <div className="homepage">
            <h1>LOGOS</h1> {/* Remove random spacing */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
