import {describe, expect, test} from '@jest/globals';
import {WayneEnterprisesProductSourceStub} from "./stub/WayneEnterprisesProductSourceStub";
import WayneEnterprisesProduct from "../suppliers/wayneenterprises/WayneEnterprisesProduct";
import WayneEnterprisesProductImporter from "../suppliers/wayneenterprises/WayneEnterprisesProductImporter";
import Product from "../Product";

describe('WayneEnterprisesProductImporter test', () => {
  test.each([
    {source: [
      new WayneEnterprisesProduct('1', 'title1', 100, 1000),
        new WayneEnterprisesProduct('2', 'title2', 200, 2000)
    ]
    }
  ])('sut projects all products', ({source}) => {
    const stub = new WayneEnterprisesProductSourceStub(source)
    const sut = new WayneEnterprisesProductImporter(stub)

    const actual = sut.fetchProduct();
    expect(actual.length).toEqual(source.length);
  });

  test.each([
    {source: [
        new WayneEnterprisesProduct('1', 'title1', 100, 1000),
        new WayneEnterprisesProduct('2', 'title2', 200, 2000)
      ]
    }
  ])('sut correctly sets supplier name', ({source}) => {
    const stub = new WayneEnterprisesProductSourceStub(source)
    const sut = new WayneEnterprisesProductImporter(stub)

    const actual = sut.fetchProduct();
    actual.forEach(product => {
      expect(product.supplierName).toEqual("WAYNE");
    })
  });

  test.each([
    {
      source: new WayneEnterprisesProduct('1', 'title1', 100, 1000),
    }
  ])('sut correctly projects source properties', ({source}) => {
    const stub = new WayneEnterprisesProductSourceStub([source])
    const sut = new WayneEnterprisesProductImporter(stub)

    const products: Product[] = [];
    sut.fetchProduct().forEach(product => products.push(product));
    const actual = products[0];

    expect(actual.productCode).toEqual(source.id);
    expect(actual.productName).toEqual(source.title);
    expect(actual.pricing.listPrice).toEqual(source.listPrice);
    expect(actual.pricing.discount).toEqual(source.listPrice - source.sellingPrice);
  });
});
