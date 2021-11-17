import React, { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as detailActions from "./store/actions/detail";
import MainPageLarge from "./containers/MainPage/MainPageLarge/MainPageLarge";
import MainPageMedium from "./containers/MainPage/MainPageMedium/MainPageMedium";
import MainPageSmall from "./containers/MainPage/MainPageSmall/MainPageSmall";
import SetupPage from "./containers/SetupPage/SetupPage";

function App() {
  const [mainCmp, setMainCmp] = useState(null);
  const sizeMode = useSelector((state) => state.detail.sizeMode);
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
  useEffect(() => {
    switch (sizeMode) {
      case 3:
        setMainCmp(<MainPageLarge />);
        break;
      case 2:
        setMainCmp(<MainPageMedium />);
        break;
      case 1:
        setMainCmp(<MainPageSmall />);
        break;
      default:
        setMainCmp(null);
        break;
    }
    return () => {
      setMainCmp(null);
    };
  }, [sizeMode]);

  return (
    <Routes>
      <Route path="/scoreboard" exact element={mainCmp}></Route>
      <Route path="/setup" exact element={<SetupPage />}></Route>
    </Routes>
  );
}

export default App;
