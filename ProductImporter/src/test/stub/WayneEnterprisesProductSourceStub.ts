import WayneEnterprisesProductSource from "../../suppliers/wayneenterprises/WayneEnterprisesProductSource";
import WayneEnterprisesProduct from "../../suppliers/wayneenterprises/WayneEnterprisesProduct";

export class WayneEnterprisesProductSourceStub implements WayneEnterprisesProductSource{
  constructor(private products: WayneEnterprisesProduct[]) {}

  fetchProducts(): WayneEnterprisesProduct[] {
    return this.products;
  }
}
