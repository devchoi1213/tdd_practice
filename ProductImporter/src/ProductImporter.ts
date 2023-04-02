import Product from "./Product";

export default interface ProductImporter {
  fetchProduct(): Product[]
}
