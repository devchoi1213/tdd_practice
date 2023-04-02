import ProductImporter from "./ProductImporter";
import ProductValidator from "./ProductValidator";
import ProductInventory from "./ProductInventory";

export default class ProductSynchronizer {
  constructor(
    private _importer: ProductImporter,
    private _validator: ProductValidator,
    private  _inventory: ProductInventory
  ) {}

  run() {
    for (let product of this._importer.fetchProduct()) {
      if ( this._validator.isValid(product)) {
        this._inventory.upsertProduct(product)
      }
    }
  }
}
