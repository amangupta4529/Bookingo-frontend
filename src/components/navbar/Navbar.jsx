import "./navbar.css";
import { Link ,useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate()
  const logOut=()=>{
    localStorage.removeItem("user");
    navigate("/login")
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">bookingo.com</span>
        </Link>
        {user ? <div className="logout">
          <div className="username" >{user.username}</div>
          <div onClick={logOut} className=" logout-btn"><FontAwesomeIcon icon={faArrowRightFromBracket}/>Logout</div>
          
        </div> : (
          <div className="navItems">
            <button className="navButton" onClick={()=>navigate("/register")}>Register</button>
            <button className="navButton"  onClick={()=>navigate("/login")}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
