export enum DivisionType {
  Quan = "quận",
  Huyen = "huyện",
  Xa = "xã",
  Phuong = "phường",
}

export enum PersonFace {
  Self = "Self",
  Partner = "Partner",
}

export enum HoverMenuPurpose {
  Filter = "filter",
  Sort = "sort",
}

export enum GoldColor {
  White = "WHITE",
  Rose = "ROSE",
  Yellow = "YELLOW",
}

export enum UserRole {
  Default = "",
  Customer = "CUSTOMER",
  Staff = "STAFF",
  Manager = "MANAGER",
  Jeweler = "JEWELER",
  Admin = "ADMIN",
  Transporter = "TRANSPORTER",
}

export enum Gender {
  Male = "NAM",
  Female = "NỮ",
}

export enum ResponseType {
  Data = "DATA",
  Error = "ERROR",
  Info = "INFO",
  Paginated = "PAGINATED_DATA",
}

export enum ErrorType {
  Validation = "VALIDATION",
  Business = "BUSINESS",
}

export enum ErrorCode {
  UnVerifiedAccount = "012",
  JwtExpired = "008",
}

export enum DeliveryMethod {
  Shipping = "Shipping",
  Pickup = "Pickup",
}

export enum CustomRequestStatus {
  Waiting = "PENDING",
  OnGoing = "APPROVED",
  Completed = "COMPLETED",
  Canceled = "REJECTED",
}

export enum CustomOrderStatus {
  Pending = "PENDING",
  Waiting = "WAITING",
  InProgress = "IN_PROGRESS",
  Done = "DONE",
  Delivering = "DELIVERING",
  Completed = "COMPLETED",
  Canceled = "CANCELED",
  Refunded = "REFUNDED",
  Resold = "RESOLD",
}

export enum MaintenanceOrderStatus {
  Done = "DONE",
  Completed = "COMPLETED",
  Delivering = "DELIVERING",
  Handling = "HANDLING",
  Paid = "PAID",
}

export enum AccountStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Verifying = "VERIFYING",
}

export enum FaceMatchResponseCode {
  Success = "200",
  FileFormatError = "408",
  NoFileError = "409",
}

export enum IdReadingResponseCode {
  Success = 0,
  InvalidParams = 1,
  InvalidFileFormat = 7,
  InvalidImage = 3,
}

export enum DesignCharacteristic {
  Default = "",
  Male = "MASCULINE",
  Female = "FEMININE",
}

export enum ProductType {
  Ring = "RING",
  Jewelry = "JEWELRY",
}

export enum Status {
  Active = "ACTIVE",
  InActive = "INACTIVE",
}

export enum FileType {
  Image = "IMAGE",
  Document = "DOCUMENT",
}

export enum VersionOwner {
  Self = "SELF",
  Partner = "PARTNER",
}

export enum CraftingRequestStatus {
  Pending = "PENDING",
  Accepted = "ACCEPTED",
  Rejected = "REJECTED",
}

export enum RingStatus {
  NotAvailable = "NOT_AVAIL",
  Available = "AVAILABLE",
  Refunded = "REFUNDED",
  Resold = "RESOLD",
}

export enum DesignStatus {
  NotAvailable = "UNAVAILABLE",
  Available = "AVAILABLE",
  Used = "USED",
}

export enum CraftingStageStatus {
  Pending = "PENDING",
  Paid = "PAID",
}

// export enum StagePercentage {
//   First = 50,
//   Second = 75,
//   Third = 100,
// }

export enum TransportOrderStatus {
  Pending = "PENDING",
  Waiting = "WAITING",
  OnGoing = "ON_GOING",
  Delivering = "DELIVERING",
  Rejected = "REJECTED",
  Completed = "COMPLETED",
  Redelivering = "REDELIVERING",
}

export enum TransactionType {
  ATM = "ATM",
  QrCode = "QRCODE",
}

export enum StaffPosition {
  Default = "",
  Designer = "DESIGNER",
  Sales = "SALES",
}

export enum JewelryStatus {
  Available = "AVAILABLE",
  Unavailable = "UNAVAILABLE",
  Purchased = "PURCHASED",
  Resold = "RESOLD",
}

export enum StandardOrderStatus {
  Pending = "PENDING",
  Paid = "PAID",
  Delivering = "DELIVERING",
  Completed = "COMPLETED",
  Canceled = "CANCELLED",
  Refunded = "REFUNDED",
}

export enum PaymentType {
  VnPay = "VNPAY",
}

export enum PaymentStatus {
  Pending = "PENDING",
  Successful = "SUCCESSFUL",
  Failed = "FAILED",
  Cancelled = "CANCELLED",
  Expired = "EXPIRED",
}

export enum ConfigurationKey {
  SideDiamondPrice = "SDPR",
  CraftingFee = "CRFE",
  RefundRatio = "REFU",
  ResellRatio = "RESE",
  ProfitRatio = "PARA",
  ShippingFee = "SHFE",
  DesignFee = "DEFE",
  FirstStageProgress = "CSP1",
  SecondStageProgress = "CSP2",
  ThirdStageProgress = "CSP3",
  DifficultyMultiply = "CFHM",
}

export enum OrderType {
  Standard = "STANDARD",
  Custom = "CUSTOM",
}

export enum PaymentMethod {
  Default = "",
  Cash = "CASH",
  Transfer = "TRANSFER",
}

export enum OrderTypeForTableOrderList {
  Resell = "RESELL",
  Refund = "REFUND",
  Custom = "CUSTOM",
  Payment = "PAYMENT",
}
export enum CraftingDifficulty {
  Normal = "NORMAL",
  Hard = "HARD",
}

