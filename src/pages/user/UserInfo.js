import "bootstrap/dist/css/bootstrap.min.css";
import {useState, useEffect, useRef} from "react";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import "./UserInfo.css";
import {GetUserImageThumbnail} from "./UserImageApi";
import defaultAvatar from "./avatar.png";

const UserInfo = ({emailAddress, setEmailAddress}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [userAccountId, setUserAccountId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultAvatar);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const parsedJwt = JSON.parse(jwt);
      try {
        setOrganizationId(parsedJwt.organization_id)
        setUserAccountId(parsedJwt.user_account_id);
      } catch (error) {
        console.error("Error parsing JWT", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userAccountId) {
      GetUserImageThumbnail(userAccountId).then(response => {
        if (response) {
          setProfileImage(`data:image/jpeg;base64,${response}`);
        } else {
          setProfileImage(defaultAvatar);
        }
      })
    }
  }, [userAccountId]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setEmailAddress(null);
    toast.success("You have successfully logged out!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
      <div className="user-info-container" ref={dropdownRef}>
        <div
            className="user-info-avatar"
            onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
              src={profileImage}
              alt="User Avatar"
              className="user-avatar"
          />
        </div>

        {showDropdown && (
            <div className="user-info-dropdown">
              <NavLink
                  to={`/organizations/${organizationId}/user/${userAccountId}/profile`}
                  className="dropdown-item">
                Profile
              </NavLink>
              <NavLink to="/settings" className="dropdown-item">
                Settings
              </NavLink>
              <NavLink
                  to="/login"
                  className="dropdown-item"
                  onClick={handleLogout}
              >
                Logout
              </NavLink>
            </div>
        )}
      </div>
  );
};

export default UserInfo;
