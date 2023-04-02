export default class WayneEnterprisesProduct {
  constructor(
    private _id: string,
    private _title: string,
    private _listPrice: number,
    private _sellingPrice: number
  ) {}

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get listPrice() {
    return this._listPrice;
  }

  get sellingPrice() {
    return this._sellingPrice;
  }
}
