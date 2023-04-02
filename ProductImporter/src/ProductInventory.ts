import Product from "./Product";

export default interface ProductInventory {
  upsertProduct(product: Product): void
}
