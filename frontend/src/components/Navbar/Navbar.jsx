import React, {useContext, useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    const[menu, setMenu] = useState("menu");

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo"/></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={() =>setMenu("home")} className={menu==="home"?"active":""}>Acasa</Link>
            <a href='#explore-all'onClick={() =>setMenu("menu")} className={menu==="menu"?"active":""}>Meniu</a>
        </ul>
        <div className="navbar-right">
            <button onClick={()=>setShowLogin(true)}>Autentificare</button>
        </div>
    </div>
  )
}

export default Navbar
