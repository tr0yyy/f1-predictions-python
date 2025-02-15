import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import SecurityManager from "../../dataProvider/securityManager/SecurityManager.jsx";

const Navbar = ({ setShowLogin }) => {
    const currentPath = window.location.pathname;

    const selectYear = (year) => {
        localStorage.setItem('selectedYear', year);
        window.location.reload();
    }

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <div className="navbar-list-item">
                    <a href='/'><img src={assets.logo} alt="Logo" className="logo"/></a>
                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => window.location.href = '/drivers'}>
                            Drivers
                        </button>
                    </div>
                    {SecurityManager.isAuthenticated() && <div className="dropdown">
                        <button className="dropbtn" onClick={() => window.location.href = '/simulations'}>
                            Simulations
                        </button>
                    </div>}
                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => window.location.href = '/results'}>
                            Results
                        </button>
                    </div>
                    {SecurityManager.isAuthenticated() && <div className="dropdown">
                        <button className="dropbtn" onClick={() => window.location.href = '/predictions'}>
                            Predictions
                        </button>
                    </div>}
                    <div className="dropdown">
                        <button className="dropbtn">Seasons</button>
                        <div className="dropdown-content">
                            <a href="#" onClick={() => selectYear(2024)}>2024</a>
                        </div>
                    </div>
                    {!SecurityManager.isAuthenticated() && <button onClick={() => setShowLogin(true)} id="autentificare">Authenticate</button>}
                    {SecurityManager.isAuthenticated() && <button onClick={() => {
                        SecurityManager.clearToken();
                        window.location.assign('/');

                    }} id="autentificare">Sign out</button>}
                </div>
            </div>
        </div>
    );
};


export default Navbar;
