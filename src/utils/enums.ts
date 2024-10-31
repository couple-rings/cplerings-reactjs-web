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
  Waiting = "WAITING",
  OnGoing = "ON GOING",
  Completed = "COMPLETED",
  Canceled = "CANCELED",
}

export enum CraftingRequestStatus {
  Waiting = "WAITING",
  InProgress = "IN PROGRESS",
  Done = "DONE",
  Completed = "COMPLETED",
  Delivering = "DELIVERING"
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
  Male = "MASCULINE",
  Female = "FEMININE",
}

export enum ProductType {
  Ring = "RING",
  Jewelry = "JEWELRY",
}
