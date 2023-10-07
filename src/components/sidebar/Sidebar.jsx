// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Context } from "../../Context/Context";

export default function Sidebar() {
  const [categories,setCategories] = useState([]);
  const {user} = useContext(Context)

  useEffect(() => {
    const fetchCategores = async () => {
      const res = await axios.get('https:blog-api.onrender.com/api/category/');
      setCategories(res.data.categories)
    }
    fetchCategores();
  },[])
  return (
    <div className="sidebar">
      {
        user &&
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={user?.profilePic}
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      }
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {
            categories.map((cat,i) => (
              <li className="sidebarListItem" key={i}>
                <Link className="link" to={`/posts?category=${cat.name}`}>
                  {cat.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
