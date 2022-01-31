import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as detailActions from "./store/actions/detail";
import * as authActions from "./store/actions/auth";
import socketIOClient from "socket.io-client";

import SetupPage from "./containers/SetupPage/SetupPage";
import MainPage from "./containers/MainPage/MainPage";
import Auth from "./containers/Auth/Auth";
import { useSelector } from "react-redux";
import HomePage from "./containers/HomePage/HomePage";
import ScoreboardView from "./containers/ScoreboardView/ScoreboardView"
import { baseUrl } from "./constants/Config";
import GameReport from "./components/UI/Report/GameReport";
import WaitPage from "./containers/WaitPage/WaitPage";

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const setOS = (os) => {
    dispatch(detailActions.setOS(os));
  };
  const setSocket = (socket) => {
    dispatch(authActions.setSocket(socket));
  };
  const setRefereeData = (refereeId, token) => {
    dispatch(authActions.getRefereeData(refereeId, token));
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
  const refereeId = useSelector((state) => state.auth.refereeId);

  const checked = useSelector((state) => state.auth.checked);
  const path = useSelector((state) => state.auth.authRedirectPath);
  const checkAuth = () => dispatch(authActions.authCheckState());
  const location = useLocation();
  useEffect(() => {
    checkAuth();
    setSocket(socketIOClient(baseUrl))
  }, []);
  useEffect(() => {
    if (!token && checked) {
      navigate(`/login`);
    }
  }, [token, checked]);
  useEffect(() => {
    if (refereeId && token) {
      setRefereeData(refereeId, token)
    }
  }, [refereeId, token])

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      if (token && checked) {
        navigate(`/home`);
      }
    }
  }, [location.pathname, token, checked])

  return (
    <Routes>
      <Route path="/home" exact element={<HomePage />}></Route>
      <Route path="/scoreboard" exact element={<MainPage />}></Route>
      <Route path="/scoreboard_view" exact element={<ScoreboardView />}></Route>
      <Route path="/setup" exact element={<SetupPage />}></Route>
      <Route path="/login" exact element={<Auth />}></Route>
      <Route path="/signup" exact element={<Auth />}></Route>
      <Route path="/report" exact element={<GameReport />}></Route>
      <Route path="/wait" exact element={<WaitPage />}></Route>


    </Routes>
  );
}

export default App;
