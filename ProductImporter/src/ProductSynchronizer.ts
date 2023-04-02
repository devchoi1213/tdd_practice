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
    this._importer.fetchProduct().forEach(product => {
      if(this._validator.isValid(product)) {
        this._inventory.upsertProduct(product)
      }
    })
  }
}
