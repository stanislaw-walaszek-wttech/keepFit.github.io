import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stuff">Stuff</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/stuff" element={<Stuff />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default Main;
