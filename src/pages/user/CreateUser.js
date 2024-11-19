import React, {useEffect, useState} from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import "./User.css";
import TextBox from "../../components/Input/Text/TextBox";
import {toast} from "react-toastify";
import AlertBox from "../../components/AlertBox/AlertBox";
import {CreateUserApi} from "./UserApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateUser = ({organizationId, enable, closeAction}) => {

  const [error, setError] = React.useState(null);
  const [openModal, setOpenModal] = useState(enable);
  const [isLoading, setIsLoading] = useState(false);
  const [requestBody, setRequestBody] = useState({
    organization_id: organizationId,
    first_name: "",
    last_name: "",
    email_address: "",
    date_of_birth: "",
    password: "",
    user_roles: []
  });

  useEffect(() => {
    setOpenModal(enable)
  }, [organizationId, enable]);

  const createUser = () => {
    setIsLoading(true);
    CreateUserApi(requestBody, organizationId)
    .then((response) => {
      if (response.status === 201) {
        toast.success('User created successfully!', {
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
      organization_id: organizationId,
      first_name: "",
      last_name: "",
      email_address: "",
      date_of_birth: "",
      password: "",
      user_roles: []
    });
    setError(null);
    closeAction();
  }

  return (
      <CustomModal
          enable={openModal}
          closeAction={resetAndCloseModal}
          header="Create User"
          primaryBtnLabel="Create"
          primaryBtnAction={createUser}
          modalBody={(
              isLoading ?
                  <LoadingSpinner/>
                  :
                  <>
                    <TextBox
                        label="First Name"
                        placeholder="Enter first name"
                        inputValue={requestBody.first_name}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, first_name: e.target.value})}
                    />
                    <TextBox
                        label="Last Name"
                        placeholder="Enter last name"
                        inputValue={requestBody.last_name}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, last_name: e.target.value})}
                    />
                    <TextBox
                        label="Email address"
                        placeholder="Enter email"
                        inputValue={requestBody.email_address}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, email_address: e.target.value})}
                    />
                    <TextBox
                        label="Password"
                        placeholder="Enter password"
                        inputValue={requestBody.password}
                        onChangeAction={(e) => setRequestBody(
                            {...requestBody, password: e.target.value})}
                    />
                    <DatePicker
                        dateFormat="dd-MM-yyyy"
                        selected={requestBody.date_of_birth}
                        onChange={(date) => {
                          let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                          setRequestBody(
                              {...requestBody, date_of_birth: formattedDate});
                        }} />
                    <AlertBox variant="danger" error={error}
                              closeAction={() => setError(null)}/>
                  </>
          )}/>
  );
}

export default CreateUser;