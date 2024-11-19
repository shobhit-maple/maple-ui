import ApiClient from "../../components/ApiClient/ApiClient";

export function GetAllOrganizationsApi() {
  return ApiClient.get("organizations")
  .then((response) => {
    return response.data.content.map(function (organization) {
      return {
        id: organization.id,
        name: organization.data.name,
        description: organization.data.description,
        phone: organization.data.phone,
        email: organization.data.email,
        address: organization.data.address
      }
    });
  })
}

export function CreateOrganizationApi(requestBody) {
  return ApiClient.post("organizations", requestBody);
}

export function UpdateOrganizationApi(requestBody, organizationId) {
  return  ApiClient.put(`organizations/${organizationId}`, requestBody);
}

export function DeleteOrganizationApi(organizationId) {
  return  ApiClient.delete(`organizations/${organizationId}`);
}
