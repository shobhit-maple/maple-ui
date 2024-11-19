import React, {useEffect, useState} from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import "./Organization.css";
import TextBox from "../../components/Input/Text/TextBox";
import {toast} from "react-toastify";
import SelectBox from "../../components/Input/Select/SelectBox";
import categoryOptions from "./CategoryOptions";
import {UpdateOrganizationApi} from "./OrganizationApi";
import AlertBox from "../../components/AlertBox/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const UpdateOrganization = ({enable, closeAction, organization}) => {

  const [openModal, setOpenModal] = useState(enable);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestBody, setRequestBody] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    setOpenModal(enable);
    if (organization) {
      setRequestBody({
        name: organization.name,
        description: organization.description,
        phone: organization.phone,
        email: organization.email,
        address: organization.address
      });
    }
  }, [enable, organization]);

  const updateOrganization = () => {
    setIsLoading(true);
    UpdateOrganizationApi(requestBody, organization.id)
    .then((response) => {
      if (response.status === 200) {
        toast.success('Organization updated successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        resetAndCloseModal();
      } else {
        setError({
          message: response.data.message,
          details: response.data.details
        })
      }
    })
    .finally(() => {
      closeAction();
      setIsLoading(false);
    });
  }

  const resetAndCloseModal = () => {
    setRequestBody({
      name: "",
      description: "",
      phone: "",
      email: "",
      address: ""
    });
    setError(null);
    closeAction();
  }

  return (
      <CustomModal
          enable={openModal}
          closeAction={resetAndCloseModal}
          header="Update Organization"
          primaryBtnLabel="Update"
          primaryBtnAction={updateOrganization}
          modalBody={(
              isLoading ?
                  <LoadingSpinner/>
                  :
                  <>
                    <TextBox
                        label="Name"
                        placeholder="Enter name"
                        inputValue={requestBody.name}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, name: e.target.value})}
                    />
                    <TextBox
                        label="Description"
                        placeholder="Enter description"
                        inputValue={requestBody.description}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, description: e.target.value})}
                    />
                    <TextBox
                        label="Email address"
                        placeholder="Enter email"
                        inputValue={requestBody.email}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, email: e.target.value})}
                    />
                    <TextBox
                        label="Phone"
                        placeholder="Enter phone number"
                        inputValue={requestBody.phone}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, phone: e.target.value})}
                    />
                    <TextBox
                        label="Address"
                        placeholder="Enter address"
                        inputValue={requestBody.address}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, address: e.target.value})}
                    />
                    <AlertBox variant="danger" error={error}
                              closeAction={() => setError(null)}/>
                  </>
          )}/>
  );
}

export default UpdateOrganization;