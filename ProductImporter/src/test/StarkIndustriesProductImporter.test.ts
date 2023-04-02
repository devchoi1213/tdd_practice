import {describe, expect, test} from '@jest/globals';
import StarkIndustriesProduct from "../suppliers/starkindustries/StarkIndustriesProduct";
import StarkIndustriesProductImporter from "../suppliers/starkindustries/StarkIndustriesProductImporter";
import {instance, mock, when} from "ts-mockito";
import StarkIndustriesProductSource from "../suppliers/starkindustries/StarkIndustriesProductSource";
import StarkIndustriesProductTranslator from "../suppliers/starkindustries/StarkIndustriesProductTranslator";
import Product from "../Product";
import Pricing from "../Pricing";

describe('StarkIndustriesProductImporter test', () => {
  test.each([
    {
      source: [
        new StarkIndustriesProduct('1', 'title1', 100, 1000),
        new StarkIndustriesProduct('2', 'title2', 200, 2000)
      ]
    }
  ])('sut projects all products', ({source}) => {
    const productSourceMock = mock<StarkIndustriesProductSource>();
    when(productSourceMock.getAllProducts()).thenReturn(source);
    const productSource = instance(productSourceMock);

    const translatorMock = mock<StarkIndustriesProductTranslator>();
    const translator = instance(translatorMock);

    const sut = new StarkIndustriesProductImporter(productSource, translator)

    const actual = sut.fetchProduct();
    expect(actual.length).toEqual(source.length);
  });

  test.each([
    {
      sourceProducts: [
        new StarkIndustriesProduct('1', 'title1', 100, 1000),
        new StarkIndustriesProduct('2', 'title2', 200, 2000)
      ],
      products: [
        new Product('1', 'title1', 'name1', new Pricing(1, 2)),
        new Product('2', 'title2', 'name2', new Pricing(3, 4))
      ]
    }
  ])('sut correctly translates source products', ({sourceProducts, products}) => {
    const productSourceMock = mock<StarkIndustriesProductSource>();
    when(productSourceMock.getAllProducts()).thenReturn(sourceProducts);
    const productSource = instance(productSourceMock);

    const translatorMock = mock<StarkIndustriesProductTranslator>();
    for (let i = 0; i < sourceProducts.length; i++) {
      when(translatorMock.translate(sourceProducts[i])).thenReturn(products[i]);
    }
    const translator = instance(translatorMock);


    const sut = new StarkIndustriesProductImporter(productSource, translator)

    const actual = sut.fetchProduct();
    expect(actual).toEqual(products);
  });
});
