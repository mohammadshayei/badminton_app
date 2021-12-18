import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ThemeProvider } from "./styles/ThemeProvider";

import detailReducer from "./store/reducers/detail";
import authReducer from "./store/reducers/auth";
import homeReducer from "./store/reducers/home";
import infoReducer from "./store/reducers/setInfo"



const rootReducer = combineReducers({
  detail: detailReducer,
  auth: authReducer,
  home: homeReducer,
  info: infoReducer

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="badminton">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
