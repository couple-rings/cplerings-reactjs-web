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
}
