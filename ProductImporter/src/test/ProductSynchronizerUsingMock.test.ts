import {describe, test} from '@jest/globals';
import WayneEnterprisesProductImporter from "../suppliers/wayneenterprises/WayneEnterprisesProductImporter";
import ProductSynchronizer from "../ProductSynchronizer";
import ListPriceFilter from "../ListPriceFilter";
import ProductInventorySpy from "./spy/ProductInventorySpy";
import Pricing from "../Pricing";
import Product from "../Product";
import {instance, mock, verify, when} from "ts-mockito";
import ProductValidator from "../ProductValidator";

describe('ProductSynchronizer test using mock', () => {
  test('sut does not save invalid product', () => {
    // Arrange
    const pricing = new Pricing(10, 1);
    const product = new Product('supplierName', 'productCode', 'productName', pricing);

    const importerMock: WayneEnterprisesProductImporter = mock(WayneEnterprisesProductImporter);
    when(importerMock.fetchProduct()).thenReturn([product]);
    const importer = instance(importerMock);

    const validatorMock: ProductValidator = mock(ListPriceFilter);
    when(validatorMock.isValid(product)).thenReturn(false);
    const validator = instance(validatorMock);

    //TODO 강의에서 자바 인터페이스로 Mock을 생성했는데 typescript로는 어떤 식으로 인터페이스로 Mock을 생성할 수 있는지 알아보고 적용할 것
    const inventoryMock: ProductInventorySpy = mock(ProductInventorySpy);
    const inventory = instance(inventoryMock)

    const sut = new ProductSynchronizer(importer, validator, inventory);

    // Act
    sut.run();

    // Assert
    verify(inventoryMock.upsertProduct(product)).never();
  });
});
