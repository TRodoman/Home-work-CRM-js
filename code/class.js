class RestorationProduct {
  constructor({productName, productWeiht, ingredients, price, productImageUrl, keywords, id, date}) {
    this.id = id();
    this.productName = productName;
    this.productWeiht = productWeiht;
    this.ingredients = ingredients;
    this.price = price;
    this.productImageUrl = productImageUrl;
    this.keywords = keywords.split(",");
    this.stopList = true;
    this.quantity = 0;
    this.date = date();
  }
}

function StoreProduct({productName, porductPrice, productImage, productDescription, keywords, id, date}) {
  this.productName = productName;
  this.porductPrice = porductPrice;
  this.productImage = productImage;
  this.productDescription = productDescription;
  this.keywords = keywords.split(",");
  this.id = id();
  this.date = date();
}

function VideoHosting({movieName, movieReleasedYear, movieImage, movilink, movieDirector, movieDescription, actors, id, date}) {
  this.movieName = movieName;
  this.movieReleasedYear = movieReleasedYear;
  this.movieImage = movieImage;
  this.movilink = movilink;
  this.movieDirector = movieDirector;
  this.movieDescription = movieDescription;
  this.actors = actors.split(",");
  this.id = id();
  this.date = date();
}

export { RestorationProduct, StoreProduct, VideoHosting };
