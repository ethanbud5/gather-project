import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
// import routes from './routes';
import Routes2 from './routes2';
import ScrollToTop from "react-router-scroll-top";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop>
              <div>
                {/* <Navbar/> */}
                <Routes2/>
                {/* {routes} */}
              </div>
            </ScrollToTop>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
