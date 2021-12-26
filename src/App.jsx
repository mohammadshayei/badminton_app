import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as detailActions from "./store/actions/detail";
import * as authActions from "./store/actions/auth";

import SetupPage from "./containers/SetupPage/SetupPage";
import MainPage from "./containers/MainPage/MainPage";
import Auth from "./containers/Auth/Auth";
import { useSelector } from "react-redux";
import HomePage from "./containers/HomePage/HomePage";
import ScoreboardView from "./containers/ScoreboardView/ScoreboardView"

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
  const token = useSelector((state) => state.auth.token);
  const checked = useSelector((state) => state.auth.checked);
  const path = useSelector((state) => state.auth.authRedirectPath);
  const checkAuth = () => dispatch(authActions.authCheckState());
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (!token && checked) {
      navigate(`/login`);
    }
  }, [token, checked]);
  useEffect(() => {
    if (path && location.pathname !== path) {
      navigate(path);
    }
  }, [path]);

  // localStorage.removeItem("refereeId");
  // localStorage.removeItem("token");
  return (
    <Routes>
      <Route path="/home" exact element={<HomePage />}></Route>
      <Route path="/scoreboard" exact element={<MainPage />}></Route>
      <Route path="/scoreboard_view" exact element={<ScoreboardView />}></Route>
      <Route path="/setup" exact element={<SetupPage />}></Route>
      <Route path="/login" exact element={<Auth />}></Route>
      <Route path="/signup" exact element={<Auth />}></Route>
    </Routes>
  );
}

export default App;
