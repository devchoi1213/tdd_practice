import Product from "../../Product";
import Pricing from "../../Pricing";
import StarkIndustriesProduct from "./StarkIndustriesProduct";

export default class StarkIndustriesProductTranslator {
  translate(product: StarkIndustriesProduct) {
    const pricing = this.getPricing(product);
    return new Product('WAYNE', product.id, product.title, pricing);
  }

  private getPricing(product: StarkIndustriesProduct) {
    const listPrice = product.listPrice;
    const discount = listPrice - product.sellingPrice;
    return new Pricing(listPrice, discount);
  }
}
