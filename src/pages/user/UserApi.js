import ApiClient from "../../components/ApiClient/ApiClient";

export function GetAllUsersApi(organizationId) {
  return ApiClient.get(`organizations/${organizationId}/user-accounts`)
  .then((response) => {
    return response.data.content.map(function (user) {
      return {
        id: user.id,
        organizationId: user.data.organization_id,
        firstName: user.data.first_name,
        lastName: user.data.last_name,
        email: user.data.email_address
      }
    });
  })
}

export function CreateUserApi(requestBody, organizationId) {
  return ApiClient.post(`organizations/${organizationId}/user-accounts`, requestBody)
}

export function UpdateUserApi(requestBody, organizationId) {
  return ApiClient.put(`organizations/${organizationId}/user-accounts`, requestBody);
}

export function DeleteUserApi(organizationId, userId) {
  return ApiClient.delete(`organizations/${organizationId}/user-accounts/${userId}`);
}
