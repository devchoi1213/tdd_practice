import ProductInventory from "../../ProductInventory";
import Product from "../../Product";

export default class ProductInventorySpy implements ProductInventory {
  private readonly _log: Product[]
  constructor() {
    this._log = [];
  }

  upsertProduct(product: Product): void {
    this._log.push(product)
  }

  get log() {
    return this._log;
  }
}
