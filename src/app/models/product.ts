export interface Product {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    productImageUrl: string;
}

export class ProductImpl implements Product {

    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    productImageUrl: string;

  constructor() {
    this.productId = 0;
    this.productName = '';
    this.productDescription = '';
    this.productPrice = 0;
    this.productStock = 0;
    this.productImageUrl = '';
  }
}
