import React, {useEffect, useState} from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import "./Organization.css";
import TextBox from "../../components/Input/Text/TextBox";
import {toast} from "react-toastify";
import SelectBox from "../../components/Input/Select/SelectBox";
import categoryOptions from "./CategoryOptions";
import {CreateOrganizationApi} from "./OrganizationApi";
import AlertBox from "../../components/AlertBox/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const CreateOrganization = ({enable, closeAction}) => {

  const [openModal, setOpenModal] = useState(enable);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestBody, setRequestBody] = useState({
    name: "",
    category: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    setOpenModal(enable)
  }, [enable]);

  const createOrganization = () => {
    setIsLoading(true);
    CreateOrganizationApi(requestBody)
    .then((response) => {
      if (response.status === 201) {
        toast.success('Organization created successfully!', {
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
      setIsLoading(false);
    });
  }

  const resetAndCloseModal = () => {
    setRequestBody({
      name: "",
      category: "",
      phone: "",
      email: ""
    });
    setError(null);
    closeAction();
  }

  return (
      <CustomModal
          enable={openModal}
          closeAction={resetAndCloseModal}
          header="Create Organization"
          primaryBtnLabel="Create"
          primaryBtnAction={createOrganization}
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
                    <SelectBox
                        label="Category"
                        placeholder="Select a category"
                        options={categoryOptions}
                        inputValue={requestBody.category}
                        onChangeAction={(selectedOption) => setRequestBody(
                            {...requestBody, category: selectedOption.value})}
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
                    <AlertBox variant="danger" error={error}
                              closeAction={() => setError(null)}/>
                  </>
          )}/>
  );
}

export default CreateOrganization;