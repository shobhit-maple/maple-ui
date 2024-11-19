import "bootstrap/dist/css/bootstrap.min.css"
import 'font-awesome/css/font-awesome.min.css';
import {Route, Routes, Navigate} from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import {ToastContainer} from "react-toastify";
import Menu from "./pages/menu/Menu";
import Project from "./pages/project/Project";
import Organization from "./pages/organization/Organization";
import Team from "./pages/team/Team";
import User from "./pages/user/User";
import UserProfile from "./pages/user/UserProfile";

export default function App() {

  return (
      <div className="app-container">
        <Menu/>
        <ToastContainer/>
        <Routes>
          <Route path="/home" element={<PrivateRoute> <Home/> </PrivateRoute>}/>
          <Route path="/organizations"
                 element={<PrivateRoute> <Organization/> </PrivateRoute>}/>
          <Route path="/organizations/:organizationId/users"
                 element={<PrivateRoute> <User/> </PrivateRoute>}/>
          <Route path="organizations/:organizationId/user/:userAccountId/profile"
                 element={<PrivateRoute> <UserProfile/> </PrivateRoute>}/>
          <Route path="/projects"
                 element={<PrivateRoute> <Project/> </PrivateRoute>}/>
          <Route path="/teams"
                 element={<PrivateRoute> <Team/> </PrivateRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Navigate to="/home" replace/>}
          />
        </Routes>
      </div>)
}