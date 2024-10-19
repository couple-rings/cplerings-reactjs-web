import axios from "src/config/axios.fpt";

export const postIdFaceMatching = (data: IFaceIdMatchRequest) => {
  const payload = new FormData();

  payload.append("file[]", data.idImage);
  payload.append("file[]", data.faceImage);

  return axios.post<unknown, IFptResponseV1<IFaceIdMatchResponse | string>>(
    `dmp/checkface/v1`,
    payload
  );
};

export const postIdReading = (file: File) => {
  const payload = new FormData();

  payload.append("image", file);

  return axios.post<unknown, IFptResponseV2<IIdReadingResponse[]>>(
    `vision/idr/vnm`,
    payload
  );
};
