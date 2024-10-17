import { ErrorType, ResponseType } from "src/utils/enums";

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

  interface IResponseError {
    code: string;
    description: string;
    type: ErrorType;
  }

  interface IResponse<T> {
    timestamp: string;
    type: ResponseType;
    errors?: IResponseError[];
    data?: T;
  }

  interface ILoginResponse {
    token: string;
    refreshToken: string;
  }

  interface IRegisterResponse {
    email: string;
  }

  interface IAccountVerifyResponse extends ILoginResponse {}

  interface ISendOtpResponse extends IRegisterResponse {}

  interface ISecondaryResponse<T> {
    statusCode: number;

    message?: string;

    error?: string | string[];

    data?: T | null;
  }

  interface ISecondaryListResponse<T> {
    currentPage: number;

    pageSize: number;

    totalPages: number;

    totalItems: number;

    items: T;
  }
}
