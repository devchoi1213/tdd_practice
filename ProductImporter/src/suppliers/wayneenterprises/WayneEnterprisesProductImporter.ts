import ProductImporter from "../../ProductImporter";
import WayneEnterprisesProductSource from "./WayneEnterprisesProductSource";
import Product from "../../Product";
import WayneEnterprisesProductTranslator from "./WayneEnterprisesProductTranslator";

export default class WayneEnterprisesProductImporter implements ProductImporter {
  private translator: WayneEnterprisesProductTranslator;

  constructor(
    private dataSource: WayneEnterprisesProductSource,
  ) {
    this.translator = new WayneEnterprisesProductTranslator();
  }

  fetchProduct(): Product[] {
    return this.dataSource.fetchProducts().map(el => {
      return this.translator.translate(el)
    })
  }
}
