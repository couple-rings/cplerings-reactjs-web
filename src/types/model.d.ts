import { DesignCharacteristic, DivisionType, GoldColor } from "src/utils/enums";

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
    id: number;

    coverImg: string;

    name: string;

    price: number;

    type: ProductType;
  }

  interface IStore {
    coverImg: string;
    name: string;
    adr: string;
    contact: string;
  }

  interface IMessage {
    _id?: string;

    sender: number;

    content: string;

    conversationId: string;

    sentAt: string;

    imageId?: IFile;

    attachmentId?: IFile;

    read?: boolean;
  }

  interface IConversation {
    _id: string;

    participants: number[];

    latestMessage?: IMessage;

    notifiedUsers?: number[];
  }

  interface IFile {
    _id: string;

    url: string;

    key: string;

    size?: number;

    originalName: string;
  }

  interface IUser {
    id: number;

    email: string;

    username: string;

    phone: string;

    avatar: string;

    hasSpouse: boolean;

    role: UserRole;
  }

  interface IMetalSpec {
    id: number;

    name: string;

    pricePerUnit: number;

    color: GoldColor;
  }

  interface IDiamondSpec {
    id: number;

    name: string;

    weight: number;

    color: string;

    clarity: string;

    shape: string;

    price: number;
  }

  interface ICollection {
    id: number;

    name: string;

    description: string;
  }

  interface IDesign {
    id: number;

    metalWeight: number;

    name: string;

    description: string;

    blueprint: {
      url: string;
    };

    characteristic: DesignCharacteristic;

    size: number;

    sideDiamondsCount: number;

    designMetalSpecifications: {
      id: number;

      metalSpecification: IMetalSpec;

      image: {
        url: string;
      };
    }[];

    designDiamondSpecifications: {
      id: number;

      diamondSpecification: IDiamondSpec;
    }[];

    designCollection: ICollection;
  }

  interface ICoupleDesign {
    id: number;

    previewImage: {
      url: string;
    };

    name: string;

    description: string;

    designs: IDesign[];
  }
}
