import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import SetupPage from "./containers/SetupPage/SetupPage";
import { useDispatch } from "react-redux";
import * as detailActions from "./store/actions/detail";

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
