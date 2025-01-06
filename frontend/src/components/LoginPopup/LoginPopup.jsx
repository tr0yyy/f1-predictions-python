import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import SecurityManager from "../../dataProvider/securityManager/SecurityManager.jsx";

const LoginPopup = ({setShowLogin}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [currState,setCurrState]= useState("Login")

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            console.log(`Will ${currState === 'Login' ? 'login' : 'register'} using ${username} and ${password}`);
            const result = currState === 'Login'
                ? (await SecurityManager.login(username, password))
                : (await SecurityManager.register(username, password));
            console.log(result);
            setError('');
            window.location.reload();
        } catch (e) {
            setError(e);
            console.log(e);
        }
    }

      return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=> setShowLogin(false) } src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    <input type="username" placeholder='Username' required onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && <p>{error}</p>}
                <button onClick={handleLogin} >{currState==="Sign up"?"Create account":"Login"}</button>
                {currState==="Login"
                ?<p>No account? <span onClick={()=>setCurrState("Sign up")}>Register</span></p>
                :<p>Already registered? <span onClick={()=>setCurrState("Login")}>Login</span></p>
                }
            </form>

        </div>
      )
}

export default LoginPopup
