import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState]= useState("Login")
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=> setShowLogin(false) } src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type="text" placeholder='Nume' required/>}
                
                <input type="email" placeholder='Email' required/>
                <input type="password" placeholder='Parola' required/>
            </div>
            <button>{currState==="Sign up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>Sunt de acord cu termenii de utilizare și politica de confidențialitate.</p>
            </div>
            {currState==="Login"
            ?<p>Vrei sa creezi un cont nou? <span onClick={()=>setCurrState("Sign up")}>Creaza cont</span></p>
            :<p>Ai deja un cont? <span onClick={()=>setCurrState("Login")}>Autentifica-te</span></p>
            }
        </form>

    </div>
  )
}

export default LoginPopup
