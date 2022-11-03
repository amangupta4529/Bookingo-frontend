import axios from "axios";
import lpy from "../../lpy.webp"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Nav from "../../navbar2/Nav";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
   const url="https://bookingo.herokuapp.com/api/auth/login";
  //  const host="http://localhost:5000/api";
  
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(url, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    
    <div className='reg-cont'>
        <Nav type="register"/>
        <div className="container">
            <div className="left-side parts">
              <div className="imgleft">
                <img src={lpy} className='bookimg'></img>
              </div>
            </div>
        <div className='form-cont right-side parts'>
            <h2>Login</h2>
        <form className='login-form' >
        
           <div className='login-form-box'>
            <div className="l-labels">
              <label htmlFor="username"> Username</label>
              <label htmlFor="password">Password</label>
            </div>
            <div className="l-input">
            <input
          type="text"
          placeholder="Enter username"
          id="username"
          onChange={handleChange}
          className="reg-input"
        />
          <input
          type="password"
          placeholder="Enter password"
          id="password"
          onChange={handleChange}
          
          className="reg-input"
        />
            </div>
            </div>
            <button disabled={loading} onClick={handleClick} className="register-btn lButton ">
          Login
        </button>
        {error && <div className="err">{error.message}</div>}
        </form>

        </div>
        </div>
        
    </div>
  );
};

export default Login;
