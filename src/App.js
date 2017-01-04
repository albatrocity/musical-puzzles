import React, { Component } from 'react';
import logo from './logo.svg';
import Shape from './components/Shape'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <Shape width={180} height={60} data={[10, 16, 5, 22, 3, 11]} />
        </p>
      </div>
    )
  }
}

export default App
