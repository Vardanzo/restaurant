function mapBasket() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let currentProducts = basket.map(function (value) {
        return `
    <div class="added-product" dataId="${value.product.id}" tagId="productCard" dataWeight="${value.product.weight}">
        <a class="product-card__link" href="/product.html" tagId="productCardLink">
            <img class="added-product__img" src="${value.product.img}" alt="${value.product.name}" tagId="productCardImg">
        </a>    
        <div class="added-product__text-wrapper">
            <a class="product-card__link" href="/product.html" tagId="productCardLink">
                <div class="added-product__title" tagId="productCardTitle">${value.product.name}</div>
            </a>    
            <div class="added-product__description" tagId="productCardDescription" dataDe>${value.product.description}</div>
        </div>
        <div class="product-counter-block"> 
            <div>
                <button class="button product-counter-button added-product__counter-remove-button" tagId="productCardRemoveButton" ${value.count <= 1 && 'disabled="true"'}></button>
                <span class="added-product__counter" tagId="counterLabel">${value.count}</span>
                <button class="button product-counter-button added-product__counter-add-button" tagId="productCardAddButton"></button>
            </div>
            <span class="added-product__price" tagId="productCardPrice">${value.product.price * value.count} ₽</span> 
            <button class="button product-counter-button added-product__remove-button" tagId="removeFromBasketButton" ></button>
        </div>
    </div>
   `
    })
    document.querySelector(".basket-page__products-section").innerHTML = currentProducts.join("");
}

mapBasket();
window.basketAPI.setSumPrice();
window.basketAPI.calcNumberOfProducts();
window.basketAPI.calcFreeDeliverySum();
checkAddToOrder();

function checkAddToOrder(){
    let basket = window.basketAPI.getBasket();

    let productCards = document.querySelectorAll(".add-to-order__item");
    for (let i = 0; i < productCards.length; i++) {
        let productCardId = productCards[i].getAttribute("dataId");
        let currentProductIndex = basket.findIndex(function (value) {
            return productCardId === value.product.id
        })
        if (currentProductIndex !== -1) {
            let addToOrder = JSON.parse(localStorage.getItem("addToOrder"));
            if (addToOrder) {
                addToOrder.push(getProduct(productCards[i]));
                localStorage.setItem("addToOrder", JSON.stringify(addToOrder));
            } else {
                localStorage.setItem("addToOrder", JSON.stringify([getProduct(productCards[i])]));
            }
            productCards[i].remove();
            window.basketAPI.setSumPrice();
            window.basketAPI.calcNumberOfProducts();
            window.basketAPI.calcFreeDeliverySum();
        }
    }
}

let addToOrderBlock = document.querySelector(".add-to-order__items-block");

function getProduct(productCard) {
    return {
        name: productCard.querySelector(".add-to-order__title").innerText,
        description: productCard.getAttribute("dataDescription"),
        img: productCard.querySelector(".add-to-order__img").getAttribute("src"),
        weight: Number(productCard.getAttribute("dataWeight")),
        price: parseInt(productCard.querySelector(".add-to-order__price").innerText),
        id: productCard.getAttribute("dataId")
    }
}

addToOrderBlock.addEventListener("click", function (event) {
    if (event.target.closest(".add-to-order__add-button")) {
        let productCard = event.target.closest(".add-to-order__item")
        let product = getProduct(productCard);
        let basket = window.basketAPI.getBasket();
        basket.push({
            product,
            count: 1
        });
        window.basketAPI.setBasket(basket);

        checkAddToOrder();

        productCard.remove();

        window.basketAPI.changeBasketButtonCount("inc");
        mapBasket();
        window.basketAPI.setSumPrice();
        window.basketAPI.calcNumberOfProducts();
        window.basketAPI.calcFreeDeliverySum();
    }
})




