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
