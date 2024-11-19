import React, {useEffect, useState} from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import "./Organization.css";
import {toast} from "react-toastify";
import {DeleteOrganizationApi} from "./OrganizationApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const DeleteOrganization = ({enable, closeAction, organization}) => {

  const [openModal, setOpenModal] = useState(enable);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOpenModal(enable);
  }, [enable]);

  const deleteOrganization = () => {
    setIsLoading(true);
    DeleteOrganizationApi(organization.id)
    .then((response) => {
      if (response.status === 204) {
        toast.success('Organization deleted successfully!', {
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
          header="Delete Organization"
          primaryBtnLabel="Delete"
          primaryBtnAction={deleteOrganization}
          modalBody={(
              isLoading ?
                  <LoadingSpinner/>
                  :
                  <>
                <span>
                  Are you sure you want to delete the organization, <b>{organization?.name}</b>
                </span>
                  </>
          )}/>
  );
}

export default DeleteOrganization;