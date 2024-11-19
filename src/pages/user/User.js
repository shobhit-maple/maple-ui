import React, {useEffect, useState} from "react";
import Page from "../../components/Page/Page";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable";
import {useParams} from "react-router-dom";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import {GetAllUsersApi} from "./UserApi";

const User = () => {
  const {organizationId} = useParams();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  // const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [userSelectedForAction, setUserSelectedForAction] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setIsLoading(true);
    GetAllUsersApi(organizationId).then(response => {
      let userData = response.map(
          user => ({...user, actions: rowActionBar(user)}));
      setUsers(userData);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const columns = [
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Actions',
      selector: row => row.actions,
    }
  ];

  const loadCreateUser = () => (
      setShowCreateUser(true)
  );

  const hideCreateUser = () => {
    setShowCreateUser(false);
    loadUsers();
  };
  //
  // const loadUpdateUser = (user) => {
  //   setUserSelectedForAction(user);
  //   setShowUpdateUser(true);
  // };
  //
  // const hideUpdateUser = () => {
  //   setShowUpdateUser(false);
  //   loadUsers();
  // };
  //
  const loadDeleteUser = (user) => {
    setUserSelectedForAction(user);
    setShowDeleteUser(true);
  };

  const hideDeleteUser = () => {
    setShowDeleteUser(false);
    loadUsers();
  };

  const pageActionBar = () => {
    return (
        <>
          <button className="btn btn-light" onClick={loadCreateUser}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          &nbsp;
          <button className="btn btn-light" onClick={loadUsers}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </>
    );
  }

  const rowActionBar = (user) => {
    return (
        <>
          {/*<button className="btn custom-btn-link"*/}
          {/*        onClick={() => loadUpdateUser(user)}>*/}
          {/*  <i className="fa fa-pencil" aria-hidden="true"></i>*/}
          {/*</button>*/}
          <button className="btn custom-btn-link"
                  onClick={() => loadDeleteUser(user)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </>
    );
  }

  return (
      <>
        <CreateUser organizationId={organizationId} enable={showCreateUser}
                    closeAction={hideCreateUser}/>
        {/*<UpdateUser enable={showUpdateUser}*/}
        {/*                    closeAction={hideUpdateUser}*/}
        {/*                    user={userSelectedForAction}/>*/}
        <DeleteUser enable={showDeleteUser}
                    closeAction={hideDeleteUser}
                    user={userSelectedForAction}/>
        <Page header="User"
              actions={pageActionBar()}
              content={
                <CustomDataTable
                    isLoading={isLoading}
                    columns={columns}
                    data={users}
                />
              }/>
      </>
  );
};

export default User;
