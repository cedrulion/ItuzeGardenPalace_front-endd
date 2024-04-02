// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Signin from './components/SignIn';
import Signup from './components/SignUp';
import Gallery from './components/Gallery';
import ReservationCrud from './components/ReservationCrud';

function App() {
  return (
    <Router>
       <Routes>
       <Route  path="/" element={<LandingPage/>} ></Route>
        <Route  path="/landingpage" element={<LandingPage/>} ></Route>
        <Route  path="/signin" element={<Signin/>} ></Route>
        <Route  path="/signup" element={<Signup/>} ></Route>
        <Route  path="/gallery" element={<Gallery/>} ></Route>
        <Route  path="/reservation" element={<ReservationCrud/>} ></Route>
        </Routes>
    </Router>
  );
}

export default App;
