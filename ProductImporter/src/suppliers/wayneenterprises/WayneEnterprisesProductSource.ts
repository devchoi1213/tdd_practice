import WayneEnterprisesProduct from "./WayneEnterprisesProduct";

export default interface WayneEnterprisesProductSource {
  fetchProducts(): WayneEnterprisesProduct[];
}
