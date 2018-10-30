import React, { Component } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import routes from './routes';
import routes2 from './routes2';

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              {/* <Navbar/> */}
              {routes}
              {routes2}
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
