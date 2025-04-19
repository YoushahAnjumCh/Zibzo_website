export class ProductsModel {
  public productName: string;
  public _id: string;
  public subtitle: string;
  public image: string;
  public offerPrice: number;
  public actualPrice: number;
  public offerPercentage: number;

  constructor(
    productName: string,
    subtitle: string,
    image: string,
    _id: string,
    offerPrice: number,
    actualPrice: number,
    offerPercentage: number
  ) {
    this.productName = productName;
    this.subtitle = subtitle;
    this.image = image;
    this._id = _id;
    this.offerPrice = offerPrice;
    this.actualPrice = actualPrice;
    this.offerPercentage = offerPercentage;
  }
}

export class HomeBannerModel {
  public _id: string;
  public id: number;
  public image: string;
  public title: string;

  constructor(_id: string, id: number, image: string, title: string) {
    this._id = _id;
    this.id = id;
    this.image = image;
    this.title = title;
  }
}

export class OfferDealModel {
  public _id: string;

  public image: string;
  public title: string;

  public logo?: string;
  public offer: string;

  constructor(
    _id: string,
    image: string,
    title: string,
    logo: string,
    offer: string
  ) {
    this._id = _id;
    this.image = image;
    this.title = title;
    this.logo = logo;
    this.offer = offer;
  }
}
