import React from 'react';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import MainPage from './containers/MainPage/MainPage';

function App() {
  // const platform = window.navigator.platform
  // console.log(platform)
  return (
    < Routes>
      <div className='app-container'>
        <Route path="/refereeing" exact element={<MainPage />}></Route>
      </div>
    </ Routes>
  );
}

export default App;
