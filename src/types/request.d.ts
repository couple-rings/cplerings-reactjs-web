import {
  CraftingRequestStatus,
  CustomRequestStatus,
  Status,
  VersionOwner,
} from "src/utils/enums";

export {};

declare global {
  interface ILoginRequest {
    email: string;
    password: string;
  }

  interface IRefreshTokenRequest {
    refreshToken: string;
  }

  interface IRegisterRequest {
    email: string;
    username: string;
    password: string;
  }

  interface IAccountVerifyRequest {
    email: string;
    verificationCode: string;
  }

  interface ISendOtpRequest {
    email: string;
  }

  interface IResetPasswordRequest {
    email: string;
    newPassword: string;
    otp: string;
  }

  interface IUpdateConversationRequest {
    userId: number;
  }

  interface IConversationFilter {
    userId: number;
  }

  interface ICreateConversationRequest {
    participants: number[];
  }

  interface IUpdateMessageRequest {
    read: boolean;
  }

  interface IMessageFilter {
    conversationId: string;

    current?: number;
  }

  interface IFaceIdMatchRequest {
    idImage: File;

    faceImage: File;
  }

  interface ICreateSpouseRequest {
    primarySpouse: {
      citizenId: string;
      dateOfBirth: string;
      fullName: string;
      customerId: number;
    };
    secondarySpouse: {
      citizenId: string;
      dateOfBirth: string;
      fullName: string;
    };
  }

  interface ICoupleDesignFilter {
    page: number;
    pageSize: number;
    collectionId?: number;
    metalSpecificationId?: number;
    minPrice?: number;
    maxPrice?: number;
  }

  interface ICustomRequestFilter {
    page: number;
    pageSize: number;
    status?: CustomRequestStatus;
    customerId?: number;
  }

  interface ICreateCRRequest {
    customerId: number;
    designIds: number[];
  }

  interface IUpdateCRRequest {
    staffId: number;
    customRequestStatus: CustomRequestStatus;
  }

  interface IDesignVersionFilter {
    page: number;
    pageSize: number;
    designId: number;
    customerId: number;
  }

  interface ICreateDesignVersionRequest {
    maleVersion: {
      designId: number;
      customerId: number;
      previewImageId: number;
      designFileId: number;
    };
    femaleVersion: {
      designId: number;
      customerId: number;
      previewImageId: number;
      designFileId: number;
    };
  }

  interface IUpdateDesignVersionRequest {
    maleVersion: {
      designVersionId: number;
      owner: VersionOwner;
    };
    femaleVersion: {
      designVersionId: number;
      owner: VersionOwner;
    };
  }

  interface IDiamondSpecFilter {
    page: number;
    pageSize: number;
  }

  interface IMetalSpecFilter {
    page: number;
    pageSize: number;
  }

  interface ICreateCustomDesignRequest {
    designVersionId: number;
    customerId: number;
    spouseId: number;
    metalWeight: number;
    blueprintId: number;
    sideDiamondAmount: number;
    diamondSpecIds: number[];
    metalSpecIds: number[];
  }

  interface ICustomDesignFilter {
    page: number;
    pageSize: number;
    state: Status;
    customerId: number;
  }

  interface ICraftingRequestFilter {
    page: number;
    pageSize: number;
    customDesignId?: number;
    customerId?: number;
    status?: CraftingRequestStatus;
  }

  interface ICraftingRequestGroupFilter {
    page: number;
    pageSize: number;
  }

  interface ICreateCraftingRequest {
    customerId: number;
    metalSpecId: number;
    diamondSpecId: number;
    customDesignId: number;
    engraving?: string;
    fingerSize: number;
    branchId: number;
  }
}
