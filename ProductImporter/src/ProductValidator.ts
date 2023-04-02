import Product from "./Product";

export default interface ProductValidator {
  isValid(product: Product): boolean
}
