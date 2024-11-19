import ApiClient from "../../components/ApiClient/ApiClient";

export function GetUserAccount(organizationId, userAccountId) {
  return ApiClient.get(
      `organizations/${organizationId}/user-accounts/${userAccountId}`)
  .then((response) => {
    return {
      id: response.data.content.id,
      organizationId: response.data.content.data.organization_id,
      firstName: response.data.content.data.first_name,
      lastName: response.data.content.data.last_name,
      dateOfBirth: response.data.content.data.date_of_birth
    }
  })
}
