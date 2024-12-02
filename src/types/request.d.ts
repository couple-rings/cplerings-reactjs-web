import {
  CraftingRequestStatus,
  CustomOrderStatus,
  CustomRequestStatus,
  DesignStatus,
  Status,
  TransportOrderStatus,
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

  interface IConversationDetailRequest {
    userId: number;

    conversationId: string;
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
    status?: DesignStatus;
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
    state?: Status;
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

  interface ICreateCraftingRingRequest {
    customerId: number;
    branchId: number;
    self: {
      designId: number;
      spouseId: number;
      metalSpecId: number;
      diamondSpecId: number;
      engraving?: string;
      fingerSize: number;
    };
    partner: {
      designId: number;
      spouseId: number;
      metalSpecId: number;
      diamondSpecId: number;
      engraving?: string;
      fingerSize: number;
    };
  }

  interface IUpdateCraftingRequest {
    firstCraftingRequestId: number;
    secondCraftingRequestId: number;
    status: CraftingRequestStatus;
    firstCommentCrafting: string;
    secondCommentCrafting: string;
  }

  interface ICustomOrderFilter {
    page: number;
    pageSize: number;
    jewelerId?: number;
    customerId?: number;
    status?: CustomOrderStatus;
    branchId?: number;
  }

  interface IUpdateContractRequest {
    signatureId: number;
    signedDate: string;
    documentId: number;
  }

  interface ICraftingStageFilter {
    page: number;
    pageSize: number;
    customOrderId: number;
  }

  interface IUpdateCraftingStageRequest {
    imageId: number;
    ringMaintenances?: {
      ringId: number;
      maintenanceDocumentId: number;
    }[];
  }

  interface IDepositCraftingStageRequest {
    craftingStageId: number;
    transportationAddressId?: number;
  }

  interface ITransporterFilter {
    page: number;
    pageSize: number;
    branchId: number;
  }

  interface IJewelerFilter extends ITransporterFilter {}

  interface IDesignStaffFilter extends ITransporterFilter {}

  interface ITransportOrderFilter {
    page: number;
    pageSize: number;
    transporterId?: number;
    branchId?: number;
    status?: TransportOrderStatus;
  }

  interface IAgreementFilter {
    page: number;
    pageSize: number;
    customerId?: number;
  }

  interface IFingerSizeFilter {
    page: number;
    pageSize: number;
  }

  interface IBranchFilter {
    page: number;
    pageSize: number;
  }

  interface ICreateTransportAddressRequest {
    address: string;
    districtCode: number;
    district: string;
    wardCode: number;
    ward: string;
    receiverName: string;
    receiverPhone: string;
    customerId: number;
  }

  interface ITransportationAddressFilter {
    page: number;
    pageSize: number;
    customerId: number;
  }

  interface IDiamondFilter {
    page: number;
    pageSize: number;
    branchId: number;
    giaReportNumber?: string;
  }

  interface ICreateDiamondRequest {
    giaDocumentId: number;
    giaReportNumber: string;
    diamondSpecificationId: number;
    branchId: number;
  }

  interface IUpdateAgreementRequest {
    agreementId: number;
    mainName: string;
    mainSignatureId: number;
    partnerName: string;
    partnerSignatureId: number;
  }
}
