import axios from "src/config/axios.chat";

export const postUploadImage = (image: File, userId: number) => {
  const payload = new FormData();
  payload.append("image", image);
  payload.append("folderName", userId + "");

  return axios.post<unknown, ISecondaryResponse<IFile>>(`files/image`, payload);
};

export const postUploadAttachment = (attachment: File, userId: number) => {
  const payload = new FormData();
  payload.append("attachment", attachment);
  payload.append("folderName", userId + "");

  return axios.post<unknown, ISecondaryResponse<IFile>>(
    `files/attachment`,
    payload
  );
};
