export {};

declare global {
  interface ILoginRequest {
    email: string;
    password: string;
  }
}
