import ProductValidator from "./ProductValidator";
import Product from "./Product";

export default class ListPriceFilter implements ProductValidator {
  constructor(
    private _lowerBound: number,
  ) {}

  isValid(product: Product): boolean {
    return product.pricing.listPrice - this._lowerBound >= 0;
  }
}
