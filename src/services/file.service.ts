import chatAxios from "src/config/axios.chat";
import mainAxios from "src/config/axios.main";

export const postUploadImage = (image: File, userId: number) => {
  const payload = new FormData();
  payload.append("image", image);
  payload.append("folderName", userId + "");

  return chatAxios.post<unknown, ISecondaryResponse<IFile>>(
    `files/image`,
    payload
  );
};

export const postUploadAttachment = (attachment: File, userId: number) => {
  const payload = new FormData();
  payload.append("attachment", attachment);
  payload.append("folderName", userId + "");

  return chatAxios.post<unknown, ISecondaryResponse<IFile>>(
    `files/attachment`,
    payload
  );
};

export const postUploadFile = (fileBase64: string) => {
  return mainAxios.post<unknown, IResponse<IMainFile>>(`files`, {
    fileBase64,
  });
};
