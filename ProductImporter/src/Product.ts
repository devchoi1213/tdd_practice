import Pricing from "./Pricing";

export default class Product {
  constructor(
    private _supplierName: string,
    private _productCode: string,
    private _productName: string,
    private _pricing: Pricing
  ) {}

  get supplierName() {
    return this._supplierName;
  }

  get productCode() {
    return this._productCode;
  }

  get productName() {
    return this._productName;
  }

  get pricing() {
    return this._pricing;
  }
}
