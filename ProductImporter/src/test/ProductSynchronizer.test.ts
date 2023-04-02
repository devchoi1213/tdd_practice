import {describe, expect, test} from '@jest/globals';
import {WayneEnterprisesProductSourceStub} from "./stub/WayneEnterprisesProductSourceStub";
import WayneEnterprisesProduct from "../suppliers/wayneenterprises/WayneEnterprisesProduct";
import WayneEnterprisesProductImporter from "../suppliers/wayneenterprises/WayneEnterprisesProductImporter";
import ProductSynchronizer from "../ProductSynchronizer";
import ListPriceFilter from "../ListPriceFilter";
import ProductInventorySpy from "./spy/ProductInventorySpy";

describe('ProductSynchronizer test', () => {
  test.each([
    {
      source: [
        new WayneEnterprisesProduct('1', 'title1', 100, 1000),
        new WayneEnterprisesProduct('2', 'title2', 200, 2000)
      ]
    }
  ])('sut correctly saves products', ({source}) => {
    // Arrange
    const stub = new WayneEnterprisesProductSourceStub(source);
    const importer = new WayneEnterprisesProductImporter(stub);
    const validator = new ListPriceFilter(0);
    const spy = new ProductInventorySpy();
    const sut = new ProductSynchronizer(importer, validator, spy);

    // Act
    sut.run();

    // Assert
    const expected = importer.fetchProduct();
    expect(spy.log).toEqual(expected);
  });

  test.each([
    {
      source: new WayneEnterprisesProduct('2', 'title2', 200, 2000)
    }
  ])('sut does not save invalid product', ({source}) => {
    // Arrange
    const lowerBound = source.listPrice + 10000;
    const validator = new ListPriceFilter(lowerBound);

    const stub = new WayneEnterprisesProductSourceStub([source]);
    const importer = new WayneEnterprisesProductImporter(stub);
    const spy = new ProductInventorySpy();
    const sut = new ProductSynchronizer(importer, validator, spy);

    // Act
    sut.run();

    // Assert
    expect(spy.log).toEqual([]);
  });
});
