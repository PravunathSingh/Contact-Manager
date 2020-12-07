import React, { Component } from 'react';
import Contact from './components/Contact';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    // can add any amount of JS

    return (
      <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          <Contact name="Pravunath Singh" email="pravunathsingh@gmail.com" phone="+918777655512" />
          <Contact name="Raghunath Singh" email="raghunathsingh@gmail.com" phone="+919836882964" />
        </div>
      </div>
    );
  }
}

export default App;

// we can put expressions and variables inside {}`