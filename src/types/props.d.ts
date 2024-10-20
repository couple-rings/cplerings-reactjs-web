import { SxProps } from "@mui/material";

export {};

declare global {
  interface IProductCardProps {
    product: IProduct;
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
}
