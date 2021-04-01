export class Product {
  constructor(
    public id: string,
    public title: string,
    public shortText: string,
    public text: string,
    public price: string,
    public photo: string,
    public inStock: boolean
  ) {}
}
