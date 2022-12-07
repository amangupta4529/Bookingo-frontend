import "./navbar.css";
import { Link ,useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate()
  const [modal, setmodal] = useState(false)
  const showModal=()=>{
      setmodal(!modal)
  }
  const logOut=()=>{
    localStorage.removeItem("user");
    navigate("/login")
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Bookingo.com</span>
        </Link>
        {user ? <div className="profile-but">
          <div className="pIcon">
          {
            user.img ? <img src={user.img} className="profilePic" />
            : 
            <FontAwesomeIcon icon={faUser}/>}
          </div>
          <div className="profileRight" onClick={showModal}>
          <div className="username" >{user.username.substring(0,Math.min(10,user.username.length))}</div>
          <div className="userLevel"> Genius Level</div>
          </div>
          {modal && <div className="profModal">
            <div className="liOptions" onClick={logOut}>Logout</div>
            <div className="liOptions">
            <Link to={"/"}  className="liOptions">Home</Link>
            </div>
          </div>}
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
