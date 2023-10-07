import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {useLocation} from "react-router-dom"

export default function Homepage() {
  const {search} = useLocation();
  const [posts,setPosts] = useState([]);
  
  useEffect(() =>{
    const fetchPosts = async () => {
      const res = await axios.get("https://blog-api-o6f8.onrender.com/api/post/" + search);
      setPosts(res.data.posts)
    }
    fetchPosts()
  },[search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
