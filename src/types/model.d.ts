import { DivisionType } from "src/utils/enums";

export {};

declare global {
  interface IDistrict {
    code: number;
    division_type: DivisionType;
    name: string;
  }

  interface IWard {
    code: number;
    division_type: DivisionType;
    name: string;
  }

  interface IProduct {
    coverImg: string;

    name: string;

    price: number;
  }

  interface IStore {
    coverImg: string;
    name: string;
    adr: string;
    contact: string;
  }
}
