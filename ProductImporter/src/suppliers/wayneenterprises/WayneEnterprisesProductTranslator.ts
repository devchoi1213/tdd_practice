import WayneEnterprisesProduct from "./WayneEnterprisesProduct";
import Product from "../../Product";
import Pricing from "../../Pricing";

export default class WayneEnterprisesProductTranslator {
  translate(product: WayneEnterprisesProduct) {
    const pricing = this.getPricing(product);
    return new Product('WAYNE', product.id, product.title, pricing);
  }

  private getPricing(product: WayneEnterprisesProduct) {
    const listPrice = product.listPrice;
    const discount = listPrice - product.sellingPrice;
    return new Pricing(listPrice, discount);
  }
}
