import { useEffect } from "react";
import "./App.scss";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as detailActions from "./store/actions/detail";
import * as authActions from "./store/actions/auth";
import socketIOClient from "socket.io-client";
import MainPage from "./containers/MainPage/MainPage";
import Auth from "./containers/Auth/Auth";
import { useSelector } from "react-redux";
import HomePage from "./containers/HomePage/HomePage";
import ScoreboardView from "./containers/ScoreboardView/ScoreboardView"
import { baseUrl } from "./constants/Config";
import GameReport from "./components/UI/Report/GameReport";
import WaitPage from "./containers/WaitPage/WaitPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import { getIp } from "./api/auth";

function App() {

  const socket = useSelector(state => state.auth.socket)
  const token = useSelector((state) => state.auth.token);
  const ip = useSelector((state) => state.detail.ip);
  const checked = useSelector((state) => state.auth.checked);

  const checkAuth = () => dispatch(authActions.authCheckState());

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const setOS = (os) => {
    dispatch(detailActions.setOS(os));
  };
  const setSocket = (socket) => {
    dispatch(authActions.setSocket(socket));
  };
  const setUserData = (token) => {
    dispatch(authActions.getUserData(token));
  };
  const setSize = (height, width) => {
    dispatch(detailActions.setSize(height, width));
  };
  const setIp = (ip) => {
    dispatch(detailActions.setIp(ip));
  };
  useEffect(() => {
    setOS(navigator.platform.toUpperCase());
    setSize(window.innerHeight, window.innerWidth);
  }, []);
  window.addEventListener("resize", () => {
    setSize(window.innerHeight, window.innerWidth);
  });




  useEffect(() => {
    (async () => {
      checkAuth();
      setSocket(socketIOClient(baseUrl))
      const res = await getIp()
      setIp(res.ip)
    })()
  }, []);

  useEffect(() => {
    if (!token && checked) {
      navigate(`/login`);
    }
  }, [token, checked]);

  useEffect(() => {
    if (token) {
      setUserData(token)
    }
  }, [token])
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      if (token && checked) {
        // navigate(`/home?page=1`);
        navigate(`/tournaments`);

      }
    }
    else if (location.pathname === '/') {
      if (token && checked) {
        // navigate(`/home?page=1`);
        navigate(`/tournaments`);

      } else {
        navigate(`/login`);
      }
    }
  }, [location.pathname, token, checked])


  useEffect(() => {
    if (socket && ip) {
      socket.emit('sub', ip)
    }
  }, [ip, socket])



  return (
    <Routes >
      {/* <Route path="/home" exact element={<HomePage />}></Route> */}
      <Route path="/tournaments" exact element={<HomePage />}></Route>
      <Route path="/my_games" exact element={<HomePage />}></Route>
      <Route path="/live_scores" exact element={<HomePage />}></Route>
      <Route path="/new_tournament" exact element={<HomePage />}></Route>
      <Route path="/tournaments/:id" element={<HomePage />} />


      <Route path="/scoreboard" exact element={<MainPage />}></Route>
      <Route
        path="/scoreboard_view"
        exact
        element={<ScoreboardView />}
      >
      </Route>
      <Route path="/login" exact element={<Auth />}></Route>
      <Route path="/signup" exact element={<Auth />}></Route>
      <Route path="/report" exact element={<GameReport />}></Route>
      <Route path="/wait" exact element={<WaitPage />}></Route>
      <Route path="/profile" exact element={<ProfilePage />}></Route>

    </Routes>

  );
}

export default App;
