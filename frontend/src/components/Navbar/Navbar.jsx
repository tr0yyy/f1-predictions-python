import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';

const Navbar = ({ setShowLogin }) => {
    const currentPath = window.location.pathname;

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <div className="navbar-list-item">
                    <a href='/' ><img src={assets.logo} alt="Logo" className="logo" /></a>
                    <a href='/drivers' className={currentPath === '/drivers' ? 'active' : ''}>
                        <img src={assets.menu_1} alt="Drivers" className="drivers" />
                    </a>
                    <a href='/teams' className={currentPath === '/teams' ? 'active' : ''}>
                        <img src={assets.menu_2} alt="Teams" className="teams" />
                    </a>
                    <a href='/circuits' className={currentPath === '/circuits' ? 'active' : ''}>
                        <img src={assets.menu_3} alt="Circuits" className="circuits" />
                    </a>
                    <a href='/predictions' className={currentPath === '/predictions' ? 'active' : ''}>
                        <img src={assets.menu_4} alt="Predictions" className="predictions" />
                    </a>
                    <div class="dropdown">
                        <button class="dropbtn">Seasons</button>
                        <div class="dropdown-content">
                            <a href="#">2023</a>
                            <a href="#">2024</a>
                            <a href="#">2025</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-right">
                <button onClick={() => setShowLogin(true)}>Autentificare</button>
            </div>
        </div>
    );
};


export default Navbar;
