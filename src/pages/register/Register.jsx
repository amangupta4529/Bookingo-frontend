import React, {useContext } from 'react'
import Nav from '../../navbar2/Nav'
import "./register.css"
import lpy from "../../lpy.webp"
import Camera from '../../Assets/Camera'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
export default function Register() {
  const navigate=useNavigate();
  const [profile, setprofile] = useState("");
  const [profileurl, setprofileurl] = useState()
  const {dispatch,loading} = useContext(AuthContext)
  const sampleUser={
            username: "",
            email:"",
            country:"",
            city:"",
            phone:"",
            img:"",
            password:""
          }
          const [user, setUser] = useState(sampleUser)
          // const host="https://bookingo.herokuapp.com/api";
          // const host="http://localhost:5000/api";
  // useEffect(() => {
  //   const img = document.querySelector("#profileImage");
  //   const file = document.querySelector("#profile-file");
  //   file.addEventListener("change", function () {
  //     //this refers to file\\
     
  //     const choosedFile = this.files[0];
  
  //     if (choosedFile) {
  //       const reader = new FileReader(); //FileReader is a predefined function of JS

  //       reader.addEventListener("load", function () {
  //         img.setAttribute("src", reader.result);
  //       });
  //       setprofile(reader.result);
  //       console.log();
  //       reader.readAsDataURL(choosedFile);
  //     }
  //   });
  // })
  const url="https://bookingo.herokuapp.com/api/auth/register"
  const handleChange=(e)=>{
    const value=e.target.value;
    const name=e.target.id;
    setUser({...user,[name]:value});
  }
  const uploadPhoto= async(e)=>{
    
    const data = new FormData();
    console.log(profile);
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "ncjn97qk");
    dispatch({type:"LOADING_START"})
    try {
      const res=await axios.post(
       "https://api.cloudinary.com/v1_1/dukysvygr/image/upload",
       data);
       const {url}=res.data;
       setprofileurl(url)

       dispatch({type:"LOADING_END"})
    } catch (error) {
      dispatch({type:"LOADING_END"})
      alert(error);
    }
  }
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"LOADING_START"})
    const newUser={...user,img:profileurl}
    try {
       const res=await axios.post(url,newUser);
       dispatch({type:"LOADING_END"})
        navigate("/login")

    } catch (err) {
      dispatch({type:"LOADING_END"})
      alert("username or email already exist")
    }
  }
  return (
    <div className='reg-cont'>
        <Nav type="login"/>
        <div className="container">
            <div className="left-side parts">
              <div className="imgleft">
                <img src={lpy} className='bookimg'></img>
              </div>
            </div>
        <div className='form-cont right-side parts'>
            <h2>Sign in or create an account</h2>
        <form className='reg-form' onSubmit={handleSubmit}>
        <div className="profile">
                  <div className="profile-img-container">
                    <img id="profileImage" src= {
                profile
                  ? URL.createObjectURL(profile[0])
                  : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              }/>
                    <label htmlFor="profile-file" id="uploadBtn">
                      <Camera />
                    </label>
                  </div>
                  <input
                    type="file"
                    id="profile-file"
                    name="profile-photo"
                    placeholder="Profile"
                    accept="Image/"
                    onChange={(e) => {
                      setprofile(e.target.files)
                      console.log(profile);
                      uploadPhoto(e);
                    }
                      
                    }
                  />
                </div>
           <div className='form-box'>
              <div className="labels">
              <label htmlFor="name">Username</label>
                <label htmlFor="email">Email address</label>
                <label htmlFor="city">City</label>
                <label htmlFor="country">Country</label>
                <label htmlFor="phone">Phone</label>
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-filed">
                <input required type="text" value={user.username} onChange={handleChange} placeholder='Enter User Name' id='username' className='reg-input'/>
                <input required type="text" value={user.email} onChange={handleChange} placeholder='Enter Your Password' id='email' className='reg-input'/>
                <input required type="text" value={user.city} onChange={handleChange} placeholder='Enter Your City' id='city' className='reg-input'/>
                <input required  type="text" value={user.country} onChange={handleChange}  placeholder='Enter User Country' id='country' className='reg-input'/>
                <input required type="tel"  value={user.phone} onChange={handleChange} placeholder='Enter User Phone' id='phone' className='reg-input'/>
                <input required type="password" value={user.password} onChange={handleChange}   name="password" placeholder='Enter Your Password ' className='reg-input' id="password" />
                </div>
            </div>
            <button type='submit' disabled={loading} className='register-btn'>Register</button>
        </form>

        </div>
        </div>
        
    </div>
  )
}
