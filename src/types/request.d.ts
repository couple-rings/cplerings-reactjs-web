import {
  CraftingRequestStatus,
  CustomRequestStatus,
  DesignCharacteristic,
  RefundMethod,
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

  interface ICreateCRRequest {
    customerId: number;
    designIds: number[];
    paymentId: number;
  }

  interface IUpdateCRRequest {
    staffId: number;
    customRequestStatus: CustomRequestStatus;
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

  interface IUpdateContractRequest {
    signatureId: number;
    signedDate: string;
    documentId: number;
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

  interface ICreateDiamondRequest {
    giaDocumentId: number;
    giaReportNumber: string;
    diamondSpecificationId: number;
    branchId: number;
  }

  interface IUpdateDiamondRequest
    extends Omit<ICreateDiamondRequest, "branchId"> {}

  interface IUpdateAgreementRequest {
    agreementId: number;
    mainName: string;
    mainSignatureId: number;
    partnerName: string;
    partnerSignatureId: number;
  }

  interface ICreateDesignRequest {
    collectionId: number;
    jewelryCategoryId: number;
    metalWeight: number;
    description: string;
    blueprintId: number;
    characteristic: DesignCharacteristic;
    size: number;
    sideDiamond: number;
    name: string;
    metalSpec: {
      metalSpecId: number;
      imageId: number;
    }[];
  }

  interface ICreateJewelryRequest {
    metalSpecId: number;
    designId: number;
    branchId: number;
  }

  interface ICreateStandardOrderRequest {
    customerId: number;
    branchId: number;
    metalSpecDesignIds: {
      metalSpecId: number;
      designId: number;
    }[];
  }

  interface IPayStandardOrderRequest {
    standardOrderId: number;
    transportationAddressId?: number;
  }

  interface ICustomOrderRefundRequest {
    customOrderId: number;
    staffId: number;
    reason: string;
    proofImageId: number;
    method: RefundMethod;
  }

  interface IStandardOrderRefundRequest {
    staffId: number;
    reason: string;
    proofImageId: number;
    refundMethod: RefundMethod;
  }

  interface ICustomOrderRefundRequest {
    customOrderId: number;
    staffId: number;
    reason: string;
    proofImageId: number;
    method: RefundMethod;
  }
}
