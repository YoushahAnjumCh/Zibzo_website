export class CartModel {
  public _id: number;
  public userID: string;
  public cartProductCount?: number;

  public productID: string[];
  constructor(
    _id: number,
    userID: string,
    productID: string[],
    cartProductCount?: number
  ) {
    this._id = _id;
    this.userID = userID;
    this.productID = productID;
    this.cartProductCount = cartProductCount;
  }
}
