import { ErrorType, Gender, ResponseType, UserRole } from "src/utils/enums";

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

  interface IListMetaData {
    page: number;
    pageSize: number;
    totalPages: number;
    count: number;
  }

  interface IListResponse<T> extends IListMetaData {
    items: T[];
  }

  interface ILoginResponse {
    token: string;
    refreshToken: string;
  }

  interface IRefreshTokenResponse extends ILoginResponse {}

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

  interface ITokenData {
    id: number;

    sub: string;

    role: UserRole;
  }

  interface IProfileResponse {
    account: IUser;

    hasSpouse: boolean;
  }

  interface IFaceIdMatchResponse {
    similarity: number;

    isMatch: boolean;
  }

  interface IFptResponseV1<T> {
    code: string;

    data: T;

    message: string;
  }

  interface IIdReadingResponse {
    id: string;

    name: string;

    dob: string;

    gender: Gender;
  }

  interface IFptResponseV2<T> {
    errorCode: number;

    data: T;

    errorMessage: string;
  }

  interface ICustomerSessionCountResponse {
    numOfSessions: number;
  }

  interface IUpdateDesignVersionResponse {
    femaleDesignVersion: IDesignVersion;

    maleDesignVersion: IDesignVersion;
  }

  interface ICreateDesignVersionResponse {
    firstDesignVersion: IDesignVersion;

    secondDesignVersion: IDesignVersion;
  }

  interface IUpdateCraftingRequestResponse {
    customOrder: ICustomOrder;

    firstCraftingRequest: ICraftingRequest;

    secondCraftingRequest: ICraftingRequest;
  }

  interface IJewelerResponse extends IUser {
    numberOfHandleCustomOrder: number;
  }

  interface IDesignStaffResponse extends IUser {
    numberOfHandledCustomRequest: number;
  }
}
