import React, { Component } from 'react';
import './App.css';
import route from "./routes";
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar/>
            <h1>App.js</h1>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
