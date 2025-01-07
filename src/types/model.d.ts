import {
  ConfigurationKey,
  CraftingRequestStatus,
  CraftingStageStatus,
  CustomOrderStatus,
  CustomRequestStatus,
  DesignCharacteristic,
  DivisionType,
  FileType,
  GoldColor,
  PaymentStatus,
  PaymentMethod,
  RingStatus,
  StandardOrderStatus,
  Status,
  TransportOrderStatus,
  VersionOwner,
  CraftingDifficulty,
  PaymentType,
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

    staffPosition: StaffPosition | null;
  }

  interface IMetalSpec {
    id: number;

    name: string;

    pricePerUnit: number;

    color: GoldColor;

    createdAt: string;
  }

  interface IDiamondSpec {
    id: number;

    name: string;

    weight: number;

    color: string;

    clarity: string;

    shape: string;

    price: number;

    createdAt: string;
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

    jewelryCategory: IJewelryCategory;

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

    createdAt: string;

    state: Status;
  }

  interface ICoupleDesign {
    id: number;

    previewImage: {
      url: string;
    };

    name: string;

    description: string;

    designs: IDesign[];

    createdAt: string;

    state: Status;
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
    designFee: { amount: number };
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
    acceptedAt: string;
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
    citizenId: string;
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
    difficulty: CraftingDifficulty;
    craftingFee: { amount: number };
    metalPricePerUnit: { amount: number };
    diamondPrice: { amount: number };
    sideDiamondPrice: { amount: number };
    price: { amount: number };
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
    refund?: IRefund;
    customOrderHistories: IStatusHistory<CustomOrderStatus>[];
    shippingFee: {
      amount: number;
    };
    priceApplicationRatio: number;
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
    payment: IPayment;
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
    standardOrder?: IStandardOrder;
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
    transportOrderHistories: IStatusHistory<TransportOrderStatus>[];
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

  interface ICartItem {
    id: string;

    design: Omit<IDesign, "designDiamondSpecifications">;

    metalSpec: {
      id: number;

      metalSpecification: IMetalSpec;

      image: {
        url: string;
      };
    };

    branch: IBranch;
  }

  interface IJewelry {
    id: number;
    metalSpecification: IMetalSpec;
    design: IDesign;
    branch: IBranch;
    purchaseDate: string;
    status: JewelryStatus;
    maintenanceDocument: {
      id: number;
      url: string;
      createdAt: string;
    };
    productNo: string;
  }

  interface IStandardOrderItem {
    id: number;
    jewelry?: IJewelry;
    branch: IBranch;
    design: IDesign;
    metalSpecification: IMetalSpec;
    price: {
      amount: number;
    };
  }

  interface IStandardOrder {
    id: number;
    customer: IUser;
    orderNo: string;
    totalPrice: {
      amount: number;
    };
    status: StandardOrderStatus;
    standardOrderHistories: IStatusHistory<StandardOrderStatus>[];
    transportationOrders: ITransportOrder[];
    standardOrderItems: IStandardOrderItem[];
    refund?: IRefund;
    createdAt: string;
  }

  interface IPayment {
    id: number;
    type: PaymentType;
    description: string;
    amount: {
      amount: number;
    };
    status: PaymentStatus;
    vnPayTransaction: {
      amount: {
        amount: number;
      };
      payDate: string;
    };
    customRequest?: ICustomRequest;
    craftingStage?: ICraftingStage;
    standardOrder?: IStandardOrder;
  }

  interface IConfigItem {
    id: number;
    key: ConfigurationKey;
    value: string;
  }

  interface IRefund {
    id: number;
    reason: string;
    method: PaymentMethod;
    amount: {
      amount: number;
    };
    staff: IUser;
    standardOrder?: IStandardOrder;
    customOrder?: ICustomOrder;
    proofImage: {
      url: string;
      createdAt: string;
    };
  }

  interface IResellOrder {
    id: number;
    jewelry: IJewelry;
    staff: IUser;
    customer: IUser;
    paymentMethod: PaymentMethod;
    amount: {
      amount: number;
    };
    proofImage: {
      url: string;
      createdAt: string;
    };
    note: string;
  }

  interface IRevenue {
    totalRevenue: {
      amount: number;
    };
    revenueForEach: {
      [date: string]: {
        amount: number;
      };
    };
  }

  interface ITotalOrder {
    orders: {
      totalCustomOrder : number;
      totalResellOrder : number;
      totalRefundOrder : number;
      cuscustomOrdersForEach : {
        [date : string] : number;
      };
      resellOrdersForEach : {
        [date : string] : number;
      };
      refundOrdersForEach : {
        [date : string] : number;
      }
    }
  }

  interface IResellOrderStatistic {
    orderId : number;
    amount : {
      amount : number;
    };
    orderType : string;
    paymentMethod : string;
    orderNo : string;
    createdAt : string;
  }

  interface IRefundOrderStatistic {
    orderId : number;
    amount : {
      amount : number;
    };
    orderType : string;
    paymentMethod : PaymentMethod;
    orderNo : string;
    createdAt : string;
  }

  interface ICustomOrderStatistic {
    orderId : number;
    amount : {
      amount : number;
    };
    orderType : string;
    paymentMethod : PaymentMethod;
    orderNo : string;
    createdAt : string;
  }

  interface IPaymentOrderStatistic {
    paymentId : number;
    amount : {
      amount : number;
    };
    orderType : string;
    paymentMethod : PaymentMethod;
    orderNo : string;
    createdAt : string;
  }

  interface ITotalRevenueOfAllTime {
    totalRevenue : {
      amount : number;
    };
  }

  interface ITotalTransactionOfAllTime {
    totalTransaction : number;
  }

  interface ITotalOrderOfAllTime {
    totalOrders : number;
  }

  interface IRevenuePaymentType {
    totalByCash : {
      amount : number;
    };
    totalByTransfer : {
      amount : number;
    }
  }

  interface ITotalIncomeOfAllTime {
    totalIn : {
      amount : number;
    }
  }

  interface ITotalExpenditureOfAllTime {
    totalExpenditure : {
      amount : number;
    };
    totalExpenditureWithTransferType : {
      amount : number;
    };
    totalExpenditureWithCashType : {
      amount : number;
    }
  }

  interface ITotalIncomeFollowingTime {
    totalIn : {
      amount : number;
    }
  }

  interface ITotalExpenditureFollowingTime {
    totalExpenditure : {
      amount : number;
    };
    totalExpenditureWithTransferType : {
      amount : number;
    };
    totalExpenditureWithCashType : {
      amount : number;
    }
  }

  interface ICustomOrderDashBoard {
    totalPrice: {
      amount: number;
    };
    createdAt: string;
    orderType: string;
    paymentMethod: string;
    orderNo: string;
  }

  interface ITop5CustomOrder {
    top5CustomOrder : ICustomOrderDashBoard[];
  }
  

  interface IResellCustomOrder {
    id: number;
    orderNo: string;
    jewelry: IJewelry;
    staff: IUser;
    customer: IUser;
    paymentMethod: PaymentMethod;
    amount: {
      amount: number;
    };
    proofImage: {
      url: string;
      createdAt: string;
    };
    note: string;
    customOrder: ICustomOrder;
  }
}
