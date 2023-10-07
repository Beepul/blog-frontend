// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";

export default function Topbar() {
  const {user,dispatch} = useContext(Context);
  const [sideBar,setSideBar] = useState(false);

 
  const handleLogout = () => {
    dispatch({type: "LOG_OUT"})
  }

  const handleSidebar = () => {
    setSideBar((prev)=> !prev);
  }
  return (
    <div className="top">
      <div className="mobile-sidebar">
        <button className="bar-icon" onClick={handleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 15H17.5" stroke="#111B19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.5 10H17.5" stroke="#111B19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.5 5H17.5" stroke="#111B19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </button>
        <div className="overlay" 
        style={{display: sideBar ? 'block' : 'none'}} 
        onClick={() => setSideBar(prev => !prev)} />
        <div className="sidebarMobile" style={{left: sideBar ? '0' : '-200%'}}>
          <div className="mobile-header">
            <Link className="logo" to="/">
              BLOG
            </Link>
            <buttin className="sidebar-close" onClick={() => setSideBar(prev => !prev)}></buttin>
          </div>
          <div className="mobile-menu">
          <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
          </div>
        </div>
      </div>
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
