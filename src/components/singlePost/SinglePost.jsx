import { Link, useParams } from "react-router-dom";
import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Context } from "../../Context/Context";


export default function SinglePost() {
  const [post,setPost] = useState({});
  const {id} = useParams();
  const {user} = useContext(Context);

  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [updateMode,setUpdateMode] = useState(false);

  useEffect(()=>{
    const fetchPost = async () => {
      const res = await axios.get(`https:blog-api.onrender.com/api/post/${id}`);
      setPost(res.data.post)
      setTitle(res.data.post.title)
      setDesc(res.data.post.description)

    }
    fetchPost();
  },[id])

  const handleDelete = async  () => {
    try {
      const res = await axios.delete(`https:blog-api.onrender.com/api/post/delete/${id}`,{
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      window.location.replace("/");
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`https:blog-api.onrender.com/api/post/update/${id}`,{title:title,description:desc},{
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      setPost(res.data.post)
      // window.location.reload();
      setUpdateMode(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.thumbnail && (
          <img
            className="singlePostImg"
            src={post.thumbnail}
            alt=""
          />
        )}
        {updateMode ? 
        <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={e => setTitle(e.target.value)}/> :   
        <h1 className="singlePostTitle">
          {post.title}
          {post.email === user?.email && (
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={() =>setUpdateMode(true)}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
          )}
        </h1>
      }
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.username}`}>
                {post.username && post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {
          updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={e => setDesc(e.target.value)}/> :
        <p className="singlePostDesc">
          {post.description}
        </p>
        }
        {
          updateMode && 
        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        }
      </div>
    </div>
  );
}
