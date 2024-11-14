import {
  CustomRequestStatus,
  DesignCharacteristic,
  DivisionType,
  FileType,
  GoldColor,
} from "src/utils/enums";

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

  interface IMainFile {
    id: number;

    url: string;

    type: FileType;
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

  interface IJewelryCategory {
    id: number;
    name: string;
    description: string;
  }

  interface ICollection {
    id: number;
    name: string;
    description: string;
  }

  interface ITopic {
    id: number;
    name: string;
    description: string;
  }

  interface ITag {
    id: number;
    name: string;
  }

  interface IDiscountCampaign {
    id: number;
    name: string;
    description: string;
    discountPercentage: number;
    collections: ICollection[];
  }

  interface ICustomRequest {
    id: number;
    comment: string;
    status: CustomRequestStatus;
    customer: Omit<IUser, "hasSpouse">;
    staff: Omit<IUser, "hasSpouse">;
    designs: IDesign[];
    createdAt: string;
  }

  interface IDesignVersion {
    id: number;
    customer: Omit<IUser, "hasSpouse">;
    design: IDesign;
    image: {
      url: string;
    };
    designFile: {
      id: number;
      url: string;
    };
    versionNumber: 0;
    isAccepted: boolean;
    isOld: boolean;
  }

  interface ICoordinate {
    latitude: number;
    longitude: number;
    orderId: number;
  }
}
