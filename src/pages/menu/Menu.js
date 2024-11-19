import "bootstrap/dist/css/bootstrap.min.css"
import Logo from "../logo/Logo";
import "./Menu.css"
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import UserInfo from "../user/UserInfo";

const Menu = () => {

  const [emailAddress, setEmailAddress] = useState(null);
  let navigate = useNavigate(); // Why is this needed in order to load this component?

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setEmailAddress(JSON.parse(jwt).email_address);
    } else {
      if (emailAddress) {
        toast.warn('Looks like your session has expired. Try logging back in', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setEmailAddress(null);
      }
      navigate("/login");
    }
  }, [localStorage.getItem("jwt")]);

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmailAddress(null);
  }

  return (
      <nav className="navbar navbar-expand-lg menu-container">
        <Logo/>
        {emailAddress &&
            <div className="collapse navbar-collapse">
              <div className="navbar-nav menu-items">
                <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/organizations"
                         className="nav-item nav-link">Organizations</NavLink>
                <NavLink to="/projects"
                         className="nav-item nav-link">Projects</NavLink>
                <NavLink to="/teams"
                         className="nav-item nav-link">Teams</NavLink>
              </div>
              <UserInfo emailAddress={emailAddress}
                        setEmailAddress={setEmailAddress}/>
            </div>}
      </nav>
  )
};

export default Menu;