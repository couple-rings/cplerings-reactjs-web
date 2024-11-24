import { SxProps } from "@mui/material";
import {
  AccountStatus,
  CustomRequestStatus,
  DesignCharacteristic,
  StagePercentage,
} from "src/utils/enums";

export {};

declare global {
  interface IProductCardProps {
    product: IProduct;

    data?: ICoupleDesign;
  }

  interface IBranchCardProps {
    data: IBranch;
  }

  interface IHeaderCardProps {
    title: string;

    subTitle: string;

    path: string;

    img: string;
  }

  interface IOtherTabProps {
    cardsList: IHeaderCardProps[];
  }

  interface IStoryProps {
    coverImg: string;
    nameImg: string;
    intro: string;
    author: string;
  }

  interface IAdCardProps {
    coverImg: string;
    title: string;
    text: string;
  }

  interface IAddressCardProps {
    data: ITransportAddress;
    setOpenDelete: (v: boolean) => void;
    setOpenUpdate: (v: boolean) => void;
    setSelected: (v: ITransportAddress) => void;
    handleCheck?: (v1: number, v2: boolean) => void;
    checked?: boolean;
  }

  interface IModalProps {
    open: boolean;
    setOpen: (v: boolean) => void;
  }

  interface IHoverMenuProps {
    title: string;

    purpose: HoverMenuPurpose;

    lists: string[] | IMetalSpec[];

    handleFilter?: (v1?: number) => void;
  }

  interface ISizeMenuProps {
    size: number;

    setSize: (v: number) => void;

    label: boolean;

    sx: SxProps;

    paperStyle: SxProps;
  }

  interface IMetalMenuProps {
    sx: SxProps;

    metal: string;

    setMetal: (v: string) => void;
  }

  interface IDiamondMenuProps {
    sx: SxProps;

    diamond: string;

    setDiamond: (v: string) => void;
  }

  interface IEngravingMenuProps {
    sx: SxProps;

    engraving: string;

    setEngraving: (v: string) => void;
  }

  interface IFeedbackProps {
    username: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    setOpenDelete: (v: boolean) => void;
    setOpenUpdate: (v: boolean) => void;
  }

  interface IProtectedRouteProps {
    children: React.ReactNode;
  }

  interface IStepperProps {
    activeStep: number;
  }

  interface IConversationProps {
    conversation: IConversation;
  }

  interface IConversationListProps {
    joinRooms: (v: string[]) => void;

    conversation?: IConversation;
  }

  interface IAttachmentMessageProps {
    url: string;

    name: string;

    size: number | undefined;

    cardBgColor?: string;
  }

  interface IAvatarMessageProps {
    timestamp: string;

    children: React.ReactElement;
  }

  interface IOwnMessageProps extends IAvatarMessageProps {}

  export interface IImageMessageProps {
    url: string;

    handleOnLoad: () => void;
  }

  interface ITextMessageProps {
    content: string;

    cardBgColor?: string;
  }

  interface ISelectFileButtonProps {
    children: React.ReactElement;

    fileAccept: string;

    handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  interface IFooterProps {
    handleSubmitFile: (file: IFile, type: string) => void;

    handleSubmitText: (v: string) => void;
  }

  interface IChatboxProps {
    handleSend: (v: IMessage) => void;

    receiveMessage: IMessage | null;
  }

  interface ISummaryProps {
    productAmount: number;

    discount: number;
  }

  interface ISideBarProps {
    open: boolean;

    setOpen: (v: boolean) => void;

    itemsList: {
      text: string;
      icon: JSX.Element;
      path: string;
    }[];
  }

  interface IHeaderProps {
    open: boolean;

    setOpen: (v: boolean) => void;
  }

  interface IHoverCardProps {
    image: string;

    file: string;

    shadow?: boolean;
  }

  interface IProductDetailAccordionProps {
    collectionName: string;

    category?: string;

    maleDetail?: {
      metalSpec: IMetalSpec;

      diamondSpec: IDiamondSpec;

      sideDiamondsCount: number;
    };

    femaleDetail?: {
      metalSpec: IMetalSpec;

      diamondSpec: IDiamondSpec;

      sideDiamondsCount: number;
    };
  }

  interface IImageProcessProps {
    imageSrcs: string[];
    setImageSrcs: (newImageSrcs: string[]) => void;
    setNoImg: (v: boolean) => void;
    stage: ICraftingStage;
  }

  interface ILoveAgreement {
    spouseName: string;
    date: string;
  }
  interface IPulseIconProps {
    icon: React.ReactNode;

    backgroundColor: string;
  }

  interface IContractFileProps {
    signature: string;

    total: number;

    name: string;

    email: string;

    phone: string;

    address: string;
  }

  interface IAccountModalProps
    extends IModalProps,
      Omit<IUser, "hasSpouse" | "avatar"> {
    status: AccountStatus;

    resetSelected?: () => void;
  }

  interface IJewelryCategoryModalProps extends IModalProps, IJewelryCategory {
    resetSelected?: () => void;
  }

  interface IDiamondModalProps extends IModalProps {
    resetSelected?: () => void;

    giaReportNumber: string;

    diamondSpecId: number;
  }

  interface ICollectionModalProps extends IModalProps, ICollection {
    resetSelected?: () => void;
  }

  interface ITopicModalProps extends IModalProps, ITopic {
    resetSelected?: () => void;
  }

  interface IDiscountCampaignModalProps extends IModalProps, IDiscountCampaign {
    resetSelected?: () => void;
  }

  interface ICoupleDesignModalProps extends IModalProps, ICoupleDesign {
    resetSelected?: () => void;
  }

  interface IDesignModalProps extends IModalProps {
    resetSelected?: () => void;
    design: IDesign;
  }

  interface IImageModalProps extends IModalProps {
    img: string;
  }

  interface IViewImgChipProps {
    image: string;
    handleViewImage: (v: string) => void;
  }

  interface IUploadImgChipProps {
    metalId: number;
    gender: DesignCharacteristic;
    handleUploadMetalImg: (
      e: React.ChangeEvent<HTMLInputElement>,
      id: number,
      gender: DesignCharacteristic
    ) => Promise<void>;
  }

  interface ICustomRequestCardProps {
    designs: IDesign[];

    status: CustomRequestStatus;

    staffId?: number;

    id: number;
  }

  interface IAddVersionModal extends IModalProps {
    handleCreateVersion: (v1: string, v2: string) => void;
  }

  interface ICraftingStageProps {
    steps: string[];

    data: ICraftingStage;

    name: string;

    orderId: number;

    previousStage?: ICraftingStage;
  }

  interface IBlogRowProps {
    blog: IBlog;

    handleClick: (v: IBlog) => void;
  }

  interface IBlogModalProps extends IModalProps {
    resetSelected?: () => void;
    blog: IBlog;
  }

  interface IViewCustomDesignProps {
    customRequestId: number;
    maleVersion: IDesignVersion;
    femaleVersion: IDesignVersion;
    designs: ICustomDesign[];
  }

  interface IRejectModalProps extends IModalProps {
    handleReject: (v1: string, v2: string) => void;
  }

  interface IPastRequestsProps {
    data: ICraftingRequest[];
  }

  interface IUpdateAddressModalProps extends IModalProps {
    selected: ITransportAddress;

    resetSelected: () => void;
  }

  interface IAddAddressModalProps extends IModalProps {
    filterObj: ITransportationAddressFilter;
  }

  interface IAddDiamondModalProps extends IModalProps {
    filterObj: IDiamondFilter;
  }

  interface ICompleteCraftingStageModalProps extends IModalProps {
    handleComplete: (v1: StagePercentage, v2: number, v3: number) => void;

    updatingStage: boolean;
  }

  interface IAgreementDetailProps {
    data: IAgreement;

    handleSignAgreement?: (
      v1: string,
      v2: string,
      v3: string,
      v4: string
    ) => Promise<IResponse<IAgreement> | undefined>;

    loading?: boolean;
  }

  interface ITransportOrderModalProps extends IModalProps {
    order: ITransportOrder;
  }
}
