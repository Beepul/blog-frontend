import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Settings() {
  const [file,setFile] = useState(null);
  const [username,setUsername] = useState('');
  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');

  const [sucess,setSucess] = useState(false);
  const {user,dispatch,isFetching,error} = useContext(Context);

  useEffect(()=>{
    setUsername(user?.username)
    // setFile(user?.profilePic)
  },[user?.username])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('oldPass', oldPassword);
    formData.append('newPass', newPassword);
    formData.append('profilePic',file);
    // console.log(formData);
    // console.log(username,oldPassword,newPassword,file)
    // dispatch({type:"LOGIN_START"});
    setSucess(false)
    
    try {
      const res = await axios.put(`https:blog-api.onrender.com/api/user/update/${user.uid}`,formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data.user})
      setSucess(true)
      setFile(null)
    
    } catch (error) {
      setSucess(false)
      // dispatch({type: "LOGIN_FAILURE"});
      console.log(error)

    }
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={(e) =>handleSubmit(e)}>
          <label>Profile Picture</label>
          <div className="settingsPP">
          {file ? (
          <img src={URL.createObjectURL(file)} alt="" />
        ) : (
          <img src={user.profilePic} alt="" />
        )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Safak" name="name" value={username} onChange={e => setUsername(e.target.value)} />
          {/* <label>Email</label>
          <input type="email" placeholder="safak@gmail.com" name="email" /> */}
          <label>Old Password</label>
          <input type="password" placeholder="Password" name="old-password" onChange={e => setOldPassword(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password"  onChange={e => setNewPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit" disabled={isFetching}>
            Update
          </button>
          {isFetching ? <span style={{marginTop: "20px", color: "#666"}}>Loading...</span> : sucess ? <span style={{marginTop: "20px", color: "teal"}}>Updated sucessfully</span> : error ? <span style={{marginTop: "20px", color: "red"}}>Error Occured while updating</span> : ''}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
