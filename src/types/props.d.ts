import { SxProps } from "@mui/material";
import {
  AccountStatus,
  CustomRequestStatus,
  DesignCharacteristic,
} from "src/utils/enums";

export {};

declare global {
  interface IProductCardProps {
    product: IProduct;

    data?: ICoupleDesign;
  }

  interface IBranchCardProps {
    store: IStore;
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
    receiverName: string;
    address: string;
    receiverPhone: string;
    setOpenDelete: (v: boolean) => void;
    setOpenUpdate: (v: boolean) => void;
  }

  interface IModalProps {
    open: boolean;
    setOpen: (v: boolean) => void;
  }

  interface IHoverMenuProps<T> {
    title: string;

    purpose: HoverMenuPurpose;

    lists: T[];
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
  }
  interface IPulseIconProps {
    icon: React.ReactNode;

    backgroundColor: string;
  }

  interface IContractFileProps {
    signature: string;
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

    staffId: number;

    id: number;
  }

  interface IAddVersionModal extends IModalProps {
    handleCreateVersion: (v1: string, v2: string) => void;
  }
}
