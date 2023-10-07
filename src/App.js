import { useContext } from "react";
import SinglePost from "./components/singlePost/SinglePost";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
// import { Router, Route, Switch } from "react-router";
import {createBrowserRouter,RouterProvider,createRoutesFromElements,Route,Outlet} from "react-router-dom"
import { Context } from "./Context/Context";

function App() {
  const {user} = useContext(Context);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/register" element={user? <Homepage /> : <Register />} />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path = "/post/:id" element={<Single />} />
        <Route path="/write" element={user?<Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
    // <Router>
    //   <Topbar />
    //   <Switch>
    //     <Route exact path="/">
    //       <Homepage />
    //     </Route>
    //     <Route path="/posts">
    //       <Homepage />
    //     </Route>
    //     <Route path="/register">
    //       {currentUser ? <Homepage /> : <Register />}
    //     </Route>
    //     <Route path="/login">{currentUser ? <Homepage /> : <Login />}</Route>
    //     <Route path="/post/:id">
    //       <Single />
    //     </Route>
    //     <Route path="/write">{currentUser ? <Write /> : <Login />}</Route>
    //     <Route path="/settings">
    //       {currentUser ? <Settings /> : <Login />}
    //     </Route>
    //   </Switch>
    // </Router>
  );
}

export default App;


const Root = () => {
  return(
    <>
      <Topbar />
      <div>
        <Outlet />
      </div>
    </>
  )
}