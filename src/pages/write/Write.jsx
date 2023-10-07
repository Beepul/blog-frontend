import { useContext, useState } from "react";
import "./write.css";
import axios from 'axios'
import { Context } from '../../Context/Context';

export default function Write() {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [file,setFile] = useState(null);

  const {user} = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('thumbnail',file)
    // console.log("formData",formData)
    try {
      const res = await axios.post('https://blog-api-o6f8.onrender.com/api/post/create',formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
          Authorization:  `Bearer ${user.accessToken}`
        }
      });
      // console.log(res)
      window.location.replace('/post/' + res.data.post._id)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="write">
      {
        file && (
          <img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )
      }
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <div className="submit-form-wrap">
        <button className="writeSubmit" type="submit">
          Publish
        </button>
        </div>
      </form>
    </div>
  );
}
