import {
  CraftingRequestStatus,
  CustomRequestStatus,
  DesignCharacteristic,
  DivisionType,
  FileType,
  GoldColor,
  VersionOwner,
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

    phone: string | null;

    avatar: string | null;

    role: UserRole;

    branch: IBranch | null;
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
    owner: VersionOwner;
  }

  interface ICoordinate {
    latitude: number;
    longitude: number;
    orderId: number;
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

  interface IBlog {
    id: number;
    title: string;
    summary: string;
    content: string;
    coverImage: string;
    topic: ITopic;
    tag: ITag;
    createdAt: string;
  }

  interface ISpouse {
    id: number;
    customerId?: number;
  }

  interface ICustomDesign {
    id: number;
    designVersion: IDesignVersion;
    spouse: ISpouse;
    account: Omit<IUser, "hasSpouse">;
    metalWeight: number;
    blueprint: {
      id: number;
      url: string;
    };
    diamondSpecifications: IDiamondSpec[];
    metalSpecifications: IMetalSpec[];
    sideDiamondsCount: number;
  }

  interface IBranch {
    id: number;
    address: string;
    storeName: string;
    phone: string;
    coverImage: {
      id: number;
      url: string;
    };
  }

  interface ICraftingRequest {
    id: number;
    customer: IUser;
    metalSpecification: IMetalSpec;
    diamondSpecification: IDiamondSpec;
    reviewer: IUser;
    engraving: string;
    fingerSize: number;
    comment: string;
    craftingRequestStatus: CraftingRequestStatus;
    createdAt: string;
    branch: IBranch;
  }

  interface ICraftingRequestGroup {
    customer: IUser;
    craftingRequests: ICraftingRequest[];
  }
}
