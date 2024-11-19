import React, {useEffect, useState} from "react";
import Page from "../../components/Page/Page";
import CreateOrganization from "./CreateOrganization";
import DeleteOrganization from "./DeleteOrganization";
import UpdateOrganization from "./UpdateOrganization";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable";
import {useNavigate} from "react-router-dom";
import {GetAllOrganizationsApi} from "./OrganizationApi";

const Organization = () => {

  let navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateOrganization, setShowCreateOrganization] = useState(false);
  const [showUpdateOrganization, setShowUpdateOrganization] = useState(false);
  const [showDeleteOrganization, setShowDeleteOrganization] = useState(false);
  const [organizationSelectedForAction, setOrganizationSelectedForAction] = useState(
      null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = () => {
    setIsLoading(true);
    GetAllOrganizationsApi().then(response => {
      let organizationData = response.map(
          org => ({...org, actions: rowActionBar(org)}));
      setOrganizations(organizationData);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Address',
      selector: row => row.address,
    },
    {
      name: 'Actions',
      selector: row => row.actions,
    }
  ];

  const loadCreateOrganization = () => (
      setShowCreateOrganization(true)
  );

  const hideCreateOrganization = () => {
    setShowCreateOrganization(false);
    loadOrganizations();
  };

  const loadUpdateOrganization = (organization) => {
    setOrganizationSelectedForAction(organization);
    setShowUpdateOrganization(true);
  };

  const hideUpdateOrganization = () => {
    setShowUpdateOrganization(false);
    loadOrganizations();
  };

  const loadDeleteOrganization = (organization) => {
    setOrganizationSelectedForAction(organization);
    setShowDeleteOrganization(true);
  };

  const hideDeleteOrganization = () => {
    setShowDeleteOrganization(false);
    loadOrganizations();
  };

  const pageActionBar = () => {
    return (
        <>
          <button className="btn btn-light" onClick={loadCreateOrganization}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          &nbsp;
          <button className="btn btn-light" onClick={loadOrganizations}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </>
    );
  }

  const rowActionBar = (organization) => {
    let usersPath = "/organizations/" + organization.id + "/users";
    return (
        <>
          <button className="btn custom-btn-link"
                  onClick={() => navigate(usersPath)}>
            <i className="fa fa-users" aria-hidden="true"></i>
          </button>
          <button className="btn custom-btn-link"
                  onClick={() => loadUpdateOrganization(organization)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="btn custom-btn-link"
                  onClick={() => loadDeleteOrganization(organization)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </>
    );
  }

  return (
      <>
        <CreateOrganization enable={showCreateOrganization}
                            closeAction={hideCreateOrganization}/>
        <UpdateOrganization enable={showUpdateOrganization}
                            closeAction={hideUpdateOrganization}
                            organization={organizationSelectedForAction}/>
        <DeleteOrganization enable={showDeleteOrganization}
                            closeAction={hideDeleteOrganization}
                            organization={organizationSelectedForAction}/>
        <Page header="Organization"
              actions={pageActionBar()}
              content={
                <CustomDataTable
                    isLoading={isLoading}
                    columns={columns}
                    data={organizations}
                />
              }/>
      </>
  );
};

export default Organization;
