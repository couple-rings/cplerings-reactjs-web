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
