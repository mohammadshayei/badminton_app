import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as detailActions from "./store/actions/detail";
import * as authActions from "./store/actions/auth";

import SetupPage from "./containers/SetupPage/SetupPage";
import MainPage from "./containers/MainPage/MainPage";
import Auth from "./containers/Auth/Auth";
import { useSelector } from "react-redux";
import HomePage from "./containers/HomePage/HomePage";
function App() {
  const dispatch = useDispatch();
  const setOS = (os) => {
    dispatch(detailActions.setOS(os));
  };
  const setSize = (height, width) => {
    dispatch(detailActions.setSize(height, width));
  };
  useEffect(() => {
    setOS(navigator.platform.toUpperCase());
    setSize(window.innerHeight, window.innerWidth);
  }, []);
  window.addEventListener("resize", () => {
    setSize(window.innerHeight, window.innerWidth);
  });
  const token = useSelector(state => state.auth.token)
  const checkAuth = () => dispatch(authActions.authCheckState());

  console.log(token)
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Routes>
      <Route path="/home" exact element={<HomePage />}></Route>
      <Route path="/scoreboard" exact element={<MainPage />}></Route>
      <Route path="/setup" exact element={<SetupPage />}></Route>
      <Route path="/login" exact element={<Auth />}></Route>
      <Route path="/signup" exact element={<Auth />}></Route>


    </Routes>
  );
}

export default App;
