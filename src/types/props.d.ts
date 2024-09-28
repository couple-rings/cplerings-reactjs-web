export {};

declare global {
  interface IProductCardProps {
    title: string;
  }

  interface IHeaderCardProps {
    title: string;

    subTitle: string;

    img: string;
  }

  interface IOtherTabProps {
    cardsList: IHeaderCardProps[];
  }
}
