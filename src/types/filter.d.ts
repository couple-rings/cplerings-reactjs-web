import {
  CraftingRequestStatus,
  CustomOrderStatus,
  CustomRequestStatus,
  DesignCharacteristic,
  DesignStatus,
  JewelryStatus,
  StandardOrderStatus,
  Status,
  TransportOrderStatus,
} from "src/utils/enums";

export {};

declare global {
  interface IPaginationFilter {
    page: number;
    pageSize: number;
  }

  interface ICoupleDesignFilter extends IPaginationFilter {
    collectionId?: number;
    metalSpecificationId?: number;
    minPrice?: number;
    maxPrice?: number;
    status?: DesignStatus;
  }

  interface IDesignFilter extends IPaginationFilter {
    designCollectionId?: number;
    size?: number;
    status?: DesignStatus;
    categoryId?: number;
    metalSpecId?: number;
    characteristic?: DesignCharacteristic;
    name?: string;
  }

  interface ICustomRequestFilter extends IPaginationFilter {
    status?: CustomRequestStatus;
    customerId?: number;
    staffId?: number;
  }

  interface IDesignVersionFilter extends IPaginationFilter {
    designId: number;
    customerId: number;
  }

  interface IDiamondSpecFilter extends IPaginationFilter {}

  interface IMetalSpecFilter extends IPaginationFilter {}

  interface ICustomDesignFilter extends IPaginationFilter {
    state?: Status;
    customerId: number;
  }

  interface ICraftingRequestFilter extends IPaginationFilter {
    customDesignId?: number;
    customerId?: number;
    status?: CraftingRequestStatus;
  }

  interface ICraftingRequestGroupFilter extends IPaginationFilter {
    branchId: number;
  }

  interface ICustomOrderFilter extends IPaginationFilter {
    jewelerId?: number;
    customerId?: number;
    status?: CustomOrderStatus;
    branchId?: number;
  }

  interface ICraftingStageFilter extends IPaginationFilter {
    customOrderId: number;
  }

  interface ITransporterFilter extends IPaginationFilter {
    branchId: number;
  }

  interface IJewelerFilter extends ITransporterFilter {}

  interface IDesignStaffFilter extends ITransporterFilter {}

  interface ITransportOrderFilter extends IPaginationFilter {
    transporterId?: number;
    branchId?: number;
    status?: TransportOrderStatus;
  }

  interface IAgreementFilter extends IPaginationFilter {
    customerId?: number;
  }

  interface IFingerSizeFilter extends IPaginationFilter {}

  interface IBranchFilter extends IPaginationFilter {}

  interface ICollectionFilter extends IPaginationFilter {}

  interface IJewelryCategoriesFilter extends IPaginationFilter {}

  interface ITransportationAddressFilter extends IPaginationFilter {
    customerId: number;
  }

  interface IDiamondFilter extends IPaginationFilter {
    branchId: number;
    giaReportNumber?: string;
  }

  interface IJewelryFilter extends IPaginationFilter {
    branchId: number;
    designId?: number;
    metalSpecId?: number;
    status?: JewelryStatus;
  }

  interface IStandardOrderFilter extends IPaginationFilter {
    customerId?: number;
    status?: StandardOrderStatus;
    branchId?: number;
  }

  interface IRefundFilter extends IPaginationFilter {
    customerId?: number;
    status?: StandardOrderStatus;
    staffId?: number;
  }

  interface ICustomerFilter extends IPaginationFilter {
    email?: string;
  }

  interface IResellFilter extends IPaginationFilter {
    customerId?: number;
    staffId?: number;
  }
}
