//* created a model class
export class ProductsModel {
  constructor(
    public subTitle: string,
    public title: string,
    public offerPrice: number,
    public actualPrice: number,
    public offerPercentage: number,
    public image: string
  ) {}
}
