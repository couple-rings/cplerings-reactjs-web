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

  interface IProtectedRouteProps {
    children: React.ReactNode;
  }
}
