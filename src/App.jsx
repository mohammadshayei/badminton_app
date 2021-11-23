import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as detailActions from "./store/actions/detail";

import SetupPage from "./containers/SetupPage/SetupPage";
import MainPage from "./containers/MainPage/MainPage";

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

  return (
    <Routes>
      <Route path="/scoreboard" exact element={<MainPage />}></Route>
      <Route path="/setup" exact element={<SetupPage />}></Route>
    </Routes>
  );
}

export default App;
