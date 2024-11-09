import { metalWeightUnit, profitRatio } from "./constants";
import white from "src/assets/whitegold.png";
import rose from "src/assets/rosegold.png";
import yellow from "src/assets/yellowgold.png";
import { GoldColor } from "./enums";

export const showSlides = (minSM: boolean, minMD: boolean, minLG: boolean) => {
  if (minLG) return 5;
  if (minMD) return 3;
  if (minSM) return 2;

  return 1;
};

export const currencyFormatter = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const sizeConverter = (bytes: number | undefined) => {
  if (!bytes) return "";

  if (bytes / Math.pow(1024, 1) >= 1024)
    return `${(bytes / Math.pow(1024, 2)).toFixed(2)} MB`;
  else return `${(bytes / Math.pow(1024, 1)).toFixed(2)} KB`;
};

export const calMinMetalPrice = (array: IMetalSpec[], metalWeight: number) => {
  const metal = array.reduce(function (prev, curr) {
    return prev.pricePerUnit < curr.pricePerUnit ? prev : curr;
  });

  return metal.pricePerUnit * (metalWeight * metalWeightUnit);
};

export const calMinDiamondPrice = (array: IDiamondSpec[]) => {
  const metal = array.reduce(function (prev, curr) {
    return prev.price < curr.price ? prev : curr;
  });

  return metal.price;
};

export const calculateDefaultPrice = (item: ICoupleDesign) => {
  const firstMetalArr: IMetalSpec[] = [];
  const secondMetalArr: IMetalSpec[] = [];
  const firstDiamondArr: IDiamondSpec[] = [];
  const secondDiamondArr: IDiamondSpec[] = [];

  item.designs[0].designMetalSpecifications.forEach((metal) => {
    firstMetalArr.push(metal.metalSpecification);
  });
  item.designs[1].designMetalSpecifications.forEach((metal) => {
    secondMetalArr.push(metal.metalSpecification);
  });
  item.designs[0].designDiamondSpecifications.forEach((diamond) => {
    firstDiamondArr.push(diamond.diamondSpecification);
  });
  item.designs[1].designDiamondSpecifications.forEach((diamond) => {
    secondDiamondArr.push(diamond.diamondSpecification);
  });

  const firstMetalPrice = calMinMetalPrice(
    firstMetalArr,
    item.designs[0].metalWeight
  );
  const secondMetalPrice = calMinMetalPrice(
    secondMetalArr,
    item.designs[1].metalWeight
  );
  const firstDiamondPrice = calMinDiamondPrice(firstDiamondArr);
  const secondDiamondPrice = calMinDiamondPrice(secondDiamondArr);

  const raw =
    (firstMetalPrice + firstDiamondPrice) * profitRatio +
    (secondMetalPrice + secondDiamondPrice) * profitRatio;

  return Math.round(raw / 100000) * 100000;
};

export const mapGoldColor = (item: IMetalSpec) => {
  const { color } = item;

  if (color === GoldColor.Rose) return rose;
  if (color === GoldColor.White) return white;
  return yellow;
};

export const getDiamondSpec = (item: IDiamondSpec) => {
  return `${item.weight * 100}PT ,${item.color} ,${item.clarity}`;
};

export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};
