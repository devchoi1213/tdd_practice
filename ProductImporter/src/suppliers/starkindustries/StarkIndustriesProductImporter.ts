import ProductImporter from "../../ProductImporter";
import Product from "../../Product";
import StarkIndustriesProductTranslator from "./StarkIndustriesProductTranslator";
import StartIndustriesProductSource from "./StarkIndustriesProductSource";

export default class StarkIndustriesProductImporter implements ProductImporter {
  constructor(
    private dataSource: StartIndustriesProductSource,
    private translator: StarkIndustriesProductTranslator
  ) {
  }

  fetchProduct(): Product[] {
    return this.dataSource.getAllProducts().map(el => this.translator.translate(el))
  }
}
