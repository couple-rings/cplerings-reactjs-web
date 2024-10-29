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
}
