import "bootstrap/dist/css/bootstrap.min.css";
import {useParams} from "react-router-dom";
import './UserProfile.css';
import {useEffect, useState, useRef} from "react";
import defaultAvatar from "./avatar.png";
import {GetUserImageFull, UploadUserImage} from "./UserImageApi";
import {GetUserAccount} from "./UserAccountApi";
import {toast} from "react-toastify";

const UserProfile = () => {
  const {organizationId} = useParams();
  const {userAccountId} = useParams();
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAccount, setUserAccount] = useState({});
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    GetUserAccount(organizationId, userAccountId)
    .then((response) => {
      setUserAccount(response);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [organizationId, userAccountId]);

  useEffect(() => {
    setIsLoadingImage(true)
    GetUserImageFull(userAccountId).then((response) => {
      if (response) {
        setProfileImage(`data:image/jpeg;base64,${response}`);
      } else {
        setProfileImage(defaultAvatar);
      }
    })
    .finally(() => {
      setIsLoadingImage(false);
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoadingImage(true);
      UploadUserImage(userAccountId, file).then((response) => {
        if (response.status === 200) {
          toast.success("Image uploaded successfully!");
          setProfileImage(URL.createObjectURL(file));
        } else {
          toast.error("Failed to upload image.");
        }
      }).finally(() => {
        setIsLoadingImage(false); // Hide the spinner once the upload is complete
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
      <div className="user-profile-container">
        <div className="user-account-details">
          <div className="profile-image" onClick={handleImageClick}>
            {profileImage &&
                <img src={profileImage} alt="User"/>
            }
            {isLoadingImage && (
                <div className="spinner-overlay">
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{display: "none"}}  // Hide the file input
                onChange={handleImageUpload}
            />
          </div>
          <div className="user-details">
            <h2>{userAccount.firstName} {userAccount.lastName}</h2>
          </div>
        </div>
        <div className="user-org-details"></div>
      </div>
  );
};

export default UserProfile;
