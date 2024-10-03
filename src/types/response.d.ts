export {};

declare global {
  interface IProvinceResponse {
    code: number;
    name: string;
    districts: IDistrict[];
  }

  interface IDistrictResponse {
    code: number;
    name: string;
    wards: IWard[];
  }
}
