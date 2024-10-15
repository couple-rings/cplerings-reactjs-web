export {};

declare global {
  interface ILoginRequest {
    email: string;
    password: string;
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

  interface IConversationFilterDto {
    userId: number;
  }

  interface IUpdateMessageRequest {
    read: boolean;
  }

  interface IMessageFilterDto {
    conversationId: string;

    current?: number;
  }
}
