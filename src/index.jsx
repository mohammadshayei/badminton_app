import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ThemeProvider } from "./styles/ThemeProvider.jsx";

import detailReducer from "./store/reducers/detail.js";
import authReducer from "./store/reducers/auth.js";
import homeReducer from "./store/reducers/home.js";
import infoReducer from "./store/reducers/setInfo.js"
import gameReducer from "./store/reducers/gameInfo.js"

const rootReducer = combineReducers({
  detail: detailReducer,
  auth: authReducer,
  home: homeReducer,
  info: infoReducer,
  gameInfo: gameReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

const container = document.getElementById("root");
ReactDOM.render(app, container);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then().catch(error => {
      console.log('SW registration failed:', error);
    });
  });
}
