import axios from "src/config/axios.province";

const provinceCode = 79;

export const getDistricts = async () => {
  return axios.get<unknown, IProvinceResponse>(`p/${provinceCode}?depth=2`);
};

export const getWards = async (districtCode: number) => {
  return axios.get<unknown, IDistrictResponse>(`d/${districtCode}?depth=2`);
};
