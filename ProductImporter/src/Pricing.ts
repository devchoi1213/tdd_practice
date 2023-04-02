export default class Pricing {
  constructor(
    private _listPrice: number,
    private _discount: number,
  ) {}

  get listPrice() {
    return this._listPrice;
  }

  get discount() {
    return this._discount;
  }
}
