import ApiClient from "../../components/ApiClient/ApiClient";

export function GetUserImageThumbnail(userAccountId) {
  return ApiClient.get(`user-accounts/${userAccountId}/images/thumbnail`)
  .then((response) => {
    return btoa(Array.from(new Uint8Array(response.data))
    .map(byte => String.fromCharCode(byte))
    .join(''));
  })
}

export function GetUserImageFull(userAccountId) {
  return ApiClient.get(`user-accounts/${userAccountId}/images/full-size`,
      {responseType: 'arraybuffer'})
  .then((response) => {
    return btoa(Array.from(new Uint8Array(response.data))
    .map(byte => String.fromCharCode(byte))
    .join(''));
  })
}

export function UploadUserImage(userAccountId, imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);
  return ApiClient.post(`user-accounts/${userAccountId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
}
