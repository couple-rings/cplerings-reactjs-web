import { ChipColor, metalWeightUnit } from "./constants";
import white from "src/assets/whitegold.png";
import rose from "src/assets/rosegold.png";
import yellow from "src/assets/yellowgold.png";
import {
  ConfigurationKey,
  CraftingRequestStatus,
  CustomOrderStatus,
  CustomRequestStatus,
  GoldColor,
  JewelryStatus,
  StandardOrderStatus,
  TransportOrderStatus,
} from "./enums";

export const showSlides = (minSM: boolean, minMD: boolean, minLG: boolean) => {
  if (minLG) return 5;
  if (minMD) return 3;
  if (minSM) return 2;

  return 1;
};

export const numberFormatter = (value: number) => {
  return value.toLocaleString("vi-VN", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
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

export const calculateDefaultPrice = (
  item: ICoupleDesign,
  configs: IConfigItem[]
) => {
  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;
  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;
  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;
  const craftingFee = configs.find(
    (item) => item.key === ConfigurationKey.CraftingFee
  )?.value;

  if (profitRatio && sideDiamondPrice && shippingFee && craftingFee) {
    const firstMetalArr: IMetalSpec[] = [];
    const secondMetalArr: IMetalSpec[] = [];
    const firstDiamondArr: IDiamondSpec[] = [];
    const secondDiamondArr: IDiamondSpec[] = [];

    const firstDesign = item.designs[0];
    const secondDesign = item.designs[1];

    firstDesign.designMetalSpecifications.forEach((metal) => {
      firstMetalArr.push(metal.metalSpecification);
    });
    secondDesign.designMetalSpecifications.forEach((metal) => {
      secondMetalArr.push(metal.metalSpecification);
    });
    firstDesign.designDiamondSpecifications.forEach((diamond) => {
      firstDiamondArr.push(diamond.diamondSpecification);
    });
    secondDesign.designDiamondSpecifications.forEach((diamond) => {
      secondDiamondArr.push(diamond.diamondSpecification);
    });

    const firstMetalPrice = calMinMetalPrice(
      firstMetalArr,
      firstDesign.metalWeight
    );
    const secondMetalPrice = calMinMetalPrice(
      secondMetalArr,
      secondDesign.metalWeight
    );
    const firstDiamondPrice = calMinDiamondPrice(firstDiamondArr);
    const secondDiamondPrice = calMinDiamondPrice(secondDiamondArr);

    const firstRaw =
      (firstMetalPrice +
        firstDiamondPrice +
        firstDesign.sideDiamondsCount * +sideDiamondPrice +
        +shippingFee +
        +craftingFee) *
      +profitRatio;
    const secondRaw =
      (secondMetalPrice +
        secondDiamondPrice +
        secondDesign.sideDiamondsCount * +sideDiamondPrice +
        +shippingFee +
        +craftingFee) *
      +profitRatio;

    return (
      Math.round(firstRaw / 1000) * 1000 + Math.round(secondRaw / 1000) * 1000
    );
  }

  return 0;
};

export const calculateDefaultJewelryPrice = (
  design: IDesign,
  configs: IConfigItem[]
) => {
  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;
  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;
  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;
  const craftingFee = configs.find(
    (item) => item.key === ConfigurationKey.CraftingFee
  )?.value;

  if (profitRatio && sideDiamondPrice && shippingFee && craftingFee) {
    const metalArr: IMetalSpec[] = [];

    design.designMetalSpecifications.forEach((metal) => {
      metalArr.push(metal.metalSpecification);
    });

    const metalPrice = calMinMetalPrice(metalArr, design.metalWeight);

    const raw =
      (metalPrice +
        design.sideDiamondsCount * +sideDiamondPrice +
        +shippingFee) *
      +profitRatio;

    return Math.round(raw / 1000) * 1000;
  }

  return 0;
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

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instanceOfMetalSpec = (object: any): object is IMetalSpec => {
  return "pricePerUnit" in object;
};

export const formatCustomRequestStatus = (
  status: CustomRequestStatus
): { text: string; color: ChipColor } => {
  if (status === CustomRequestStatus.Waiting)
    return {
      text: "Đang Chờ Duyệt",
      color: "warning",
    };

  if (status === CustomRequestStatus.OnGoing)
    return {
      text: "Đang Thiết Kế",
      color: "warning",
    };

  if (status === CustomRequestStatus.Canceled)
    return {
      text: "Đã Hủy",
      color: "error",
    };

  return {
    text: "Đã Hoàn Thành",
    color: "success",
  };
};

export const formatCraftingRequestStatus = (
  status: CraftingRequestStatus
): { text: string; color: ChipColor } => {
  if (status === CraftingRequestStatus.Pending)
    return {
      text: "Chờ duyệt",
      color: "warning",
    };

  if (status === CraftingRequestStatus.Rejected)
    return {
      text: "Từ chối",
      color: "error",
    };

  return {
    text: "Đã duyệt",
    color: "success",
  };
};

export const formatCustomOrderStatus = (
  status: CustomOrderStatus
): { text: string; color: ChipColor } => {
  if (status === CustomOrderStatus.Pending)
    return {
      text: "Chưa Thanh Toán",
      color: "warning",
    };

  if (status === CustomOrderStatus.Waiting)
    return {
      text: "Đang Chuẩn Bị",
      color: "warning",
    };

  if (status === CustomOrderStatus.InProgress)
    return {
      text: "Đang Gia Công",
      color: "secondary",
    };

  if (status === CustomOrderStatus.Done)
    return {
      text: "Hoàn Tất Gia Công",
      color: "primary",
    };

  if (status === CustomOrderStatus.Delivering)
    return {
      text: "Đang Giao",
      color: "primary",
    };

  if (status === CustomOrderStatus.Completed)
    return {
      text: "Hoàn Thành",
      color: "success",
    };

  return {
    text: "Đã Hủy",
    color: "error",
  };
};

export const formatJewelryStatus = (
  status: JewelryStatus
): { text: string; color: ChipColor } => {
  if (status === JewelryStatus.Available)
    return {
      text: "Available",
      color: "success",
    };

  if (status === JewelryStatus.Purchased)
    return {
      text: "Purchased",
      color: "info",
    };

  return {
    text: "Unavailable",
    color: "warning",
  };
};

export const formatStandardOrderStatus = (
  status: StandardOrderStatus
): { text: string; color: ChipColor } => {
  if (status === StandardOrderStatus.Pending)
    return {
      text: "Chưa Thanh Toán",
      color: "warning",
    };

  if (status === StandardOrderStatus.Paid)
    return {
      text: "Đã Thanh Toán",
      color: "info",
    };

  if (status === StandardOrderStatus.Delivering)
    return {
      text: "Đang Giao",
      color: "info",
    };

  if (status === StandardOrderStatus.Completed)
    return {
      text: "Hoàn Thành",
      color: "success",
    };

  return {
    text: "Đã Hủy",
    color: "error",
  };
};

export const formatTransportOrderStatus = (
  status: TransportOrderStatus
): { text: string; color: ChipColor } => {
  if (status === TransportOrderStatus.Pending)
    return {
      text: "Chờ Giao",
      color: "default",
    };

  if (status === TransportOrderStatus.Waiting)
    return {
      text: "Chuẩn Bị Hàng",
      color: "warning",
    };

  if (status === TransportOrderStatus.OnGoing)
    return {
      text: "Bắt Đầu Giao",
      color: "info",
    };

  if (status === TransportOrderStatus.Delivering)
    return {
      text: "Đang Giao",
      color: "info",
    };

  if (status === TransportOrderStatus.Completed)
    return {
      text: "Hoàn Thành",
      color: "success",
    };

  if (status === TransportOrderStatus.Redelivering)
    return {
      text: "Chờ Giao Lại",
      color: "warning",
    };

  return {
    text: "Thất Bại",
    color: "error",
  };
};
