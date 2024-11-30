import {
  CraftingRequestStatus,
  CraftingStageStatus,
  CustomOrderStatus,
  CustomRequestStatus,
  DesignCharacteristic,
  DivisionType,
  FileType,
  GoldColor,
  RingStatus,
  TransportOrderStatus,
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

    partner?: IUser;

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
    customer: IUser;
    staff?: IUser;
    designs: IDesign[];
    createdAt: string;
    customRequestHistories: IStatusHistory<CustomRequestStatus>[];
  }

  interface IDesignVersion {
    id: number;
    customer: IUser;
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
    owner?: VersionOwner;
    createdAt: string;
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
    fullName: string;
  }

  interface ICustomDesign {
    id: number;
    designVersion: IDesignVersion;
    spouse: ISpouse;
    account: IUser;
    metalWeight: number;
    blueprint: {
      id: number;
      url: string;
    };
    diamondSpecifications: IDiamondSpec[];
    metalSpecifications: IMetalSpec[];
    sideDiamondsCount: number;
    createdAt: string;
  }

  interface IBranch {
    id: number;
    address: string;
    storeName: string;
    phone: string;
    coverImage?: {
      id: number;
      url: string;
    };
  }

  interface ICraftingRequest {
    id: number;
    customer: IUser;
    metalSpecification: IMetalSpec;
    diamondSpecification: IDiamondSpec;
    reviewer?: IUser;
    engraving: string;
    fingerSize: number;
    comment: string;
    craftingRequestStatus: CraftingRequestStatus;
    createdAt: string;
    branch: IBranch;
    customDesign: ICustomDesign;
    craftingRequestHistories: IStatusHistory<CraftingRequestStatus>[];
  }

  interface ICraftingRequestGroup {
    customer: IUser;
    craftingRequests: ICraftingRequest[];
  }

  interface IDiamond {
    id: number;
    giaReportNumber: string;
    giaDocument: {
      id: number;
      url: string;
    };
    diamondSpecification: IDiamondSpec;
    branch: IBranch;
    createdAt: string;
  }

  interface IRing {
    id: number;
    purchaseDate: string;
    status: RingStatus;
    maintenanceExpiredDate: string;
    maintenanceDocument?: {
      id: number;
      url: string;
      createdAt: string;
    };
    spouse: ISpouse;
    customDesign: ICustomDesign;
    fingerSize: number;
    engraving?: string;
    metalSpecification: IMetalSpec;
    diamonds: IDiamond[];
    branch: IBranch;
  }

  interface IContract {
    id: number;
    signature?: {
      id: number;
      url: string;
      createdAt: string;
    };
    signedDate?: string;
    document?: {
      id: number;
      url: string;
    };
    createdAt: string;
  }

  interface ICustomOrder {
    id: number;
    orderNo: string;
    firstRing: IRing;
    secondRing: IRing;
    customer: IUser;
    jeweler?: IUser;
    contract: IContract;
    totalPrice: {
      amount: number;
    };
    status: CustomOrderStatus;
    createdAt: string;
    customOrderHistories: IStatusHistory<CustomOrderStatus>[];
  }

  interface ICraftingStage {
    id: number;
    name: string;
    customOrderId: number;
    progress: number;
    completionDate?: string;
    image?: {
      id: number;
      url: string;
    };
    status: CraftingStageStatus;
    craftingStageHistories: IStatusHistory<CraftingStageStatus>[];
  }

  interface ITransportOrder {
    id: number;
    orderNo: string;
    status: TransportOrderStatus;
    receiverName: string;
    receiverPhone: string;
    deliveryAddress: string;
    customOrder?: ICustomOrder;
    transporter?: IUser;
    transportationNotes?: {
      id: number;
      date: string;
      note: string;
    }[];
    image: {
      id: number;
      url: string;
    };
  }

  interface IAgreement {
    id: number;
    customer: IUser;
    mainName: string;
    mainSignature: {
      id: number;
      url: string;
    };
    partnerName: string;
    partnerSignature: {
      id: number;
      url: string;
    };
    signedDate: string;
  }

  interface IFingerSize {
    id: number;
    size: number;
    diameter: number;
  }

  interface ITransportAddress {
    id: number;
    address: string;
    districtCode: number;
    district: string;
    wardCode: number;
    ward: string;
    receiverName: string;
    receiverPhone: string;
    customer: IUser;
  }

  interface IStatusHistory<T> {
    id: number;
    status: T;
    createdAt: string;
  }
}
