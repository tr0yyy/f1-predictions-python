import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Drivers from './pages/Drivers/Drivers';
import Teams from './pages/Teams/Teams';
import Circuits from './pages/Circuits/Circuits';
import Predictions from './pages/Predictions/Predictions';
import Home from './pages/Home/Home';
import LoginPopup from './components/LoginPopup/LoginPopup'
import Simulations from "./pages/Simulations/Simulations.jsx";
import Results from "./pages/Results/Results.jsx";

const App = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <Router>
            {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
            <div className="app-container">
                <Navbar setShowLogin={setShowLogin} />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/drivers" element={<Drivers />} />
                        <Route path="/simulations" element={<Simulations />}/>
                        <Route path="/results" element={<Results/>}/>
                        <Route path="/predictions" element={<Predictions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
