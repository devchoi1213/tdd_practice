import StarkIndustriesProduct from "./StarkIndustriesProduct";

export default interface StarkIndustriesProductSource {
  getAllProducts(): StarkIndustriesProduct[];
}
