

function renderCurrentProduct(product){
    document.querySelector(".product-section").setAttribute("dataId", product.id)
    document.querySelector(".info-block__title").innerText= product.name;
    document.querySelector(".info-block__text").innerText= product.description;
    document.querySelector(".info-block__price").innerText= `${product.price} ₽`;
    document.querySelector(".info-block__weight").innerText= `Вес ${product.weight} г`;
    document.querySelector(".product-section__img").setAttribute("src", product.img);
}

function pageInit(){
    let currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
    let basket = window.basketAPI.getBasket();
    let basketEntry = basket.find(value => {
        return value.product.id === currentProduct.id
    });
    if (basketEntry){
        let productCard = document.querySelector('[tagId="productCard"]');
        renderCurrentProduct(basketEntry.product);
        window.basketAPI.showCounter(productCard);
        window.basketAPI.setCardPrice(productCard, basketEntry.count * basketEntry.product.price);
        productCard.append(window.basketAPI.createCardLabel(basketEntry.count));
    }else {
        renderCurrentProduct(currentProduct);
    }
}
pageInit();
