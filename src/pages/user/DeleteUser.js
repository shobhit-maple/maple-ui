import React, {useEffect, useState} from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import "./User.css";
import {toast} from "react-toastify";
import {DeleteUserApi} from "./UserApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const DeleteUser = ({enable, closeAction, user}) => {

  const [openModal, setOpenModal] = useState(enable);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOpenModal(enable);
  }, [enable]);

  const deleteUser = () => {
    setIsLoading(true);
    DeleteUserApi(user.organizationId, user.id)
    .then((response) => {
      if (response.status === 204) {
        toast.success('User deleted successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    })
    .finally(() => {
      closeAction();
      setIsLoading(false);
    });
  }

  return (
      <CustomModal
          enable={openModal}
          closeAction={closeAction}
          header="Delete User"
          primaryBtnLabel="Delete"
          primaryBtnAction={deleteUser}
          modalBody={(
              isLoading ?
                  <LoadingSpinner/>
                  :
                  <>
                <span>
                  Are you sure you want to delete the user, <b>{user?.firstName} {user?.lastName}</b>
                </span>
                  </>
          )}/>
  );
}

export default DeleteUser;