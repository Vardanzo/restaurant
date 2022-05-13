function showCounter(card) {
    card.querySelector(".product-card__button").classList.add("button_hidden");
    card.querySelector(".product-card__remove-button").classList.remove("button_hidden");
    card.querySelector(".product-card__add-button").classList.remove("button_hidden");
}

function hideCounter(card) {
    card.querySelector(".product-card__button").classList.remove("button_hidden");
    card.querySelector(".product-card__remove-button").classList.add("button_hidden");
    card.querySelector(".product-card__add-button").classList.add("button_hidden");
}

function getBasket() {
    let basket = localStorage.getItem("basket")
    if (basket) {
        return JSON.parse(basket);
    }
    return [];
}

function setBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function changeBasketButtonCount(operator) {
    let basketCounter = document.querySelector("#amountItemsInBucket")
    if (operator === "inc") {
        basketCounter.innerText = Number(basketCounter.innerText) + 1;
    } else if (operator === "dec") {
        basketCounter.innerText = Number(basketCounter.innerText) - 1;
    }
}

function setCardPrice(card, price) {
    card.querySelector(".product-card__price").innerText = price + ' ₽';
}

function createCardLabel(count) {
    let label = document.createElement("div");
    label.classList.add("product-card__label");
    label.innerText = count;
    return label;
}

function setCardLabelValue(card, value) {
    card.querySelector(".product-card__label").innerText = value;
}

function createProductObject(productCard) {
    return {
        name: productCard.querySelector(".product-card__title").innerText,
        description: productCard.querySelector(".product-card__description").innerText,
        img: productCard.querySelector(".product-card__img").getAttribute("src"),
        weight: parseInt(productCard.querySelector(".product-card__weight").innerText.slice(5)),
        price: parseInt(productCard.querySelector(".product-card__price").innerText),
        id: productCard.getAttribute("dataId")
    };
}

document.querySelector("#menuList").addEventListener("click", function (event) {
    event.preventDefault();

    let basket = getBasket();

    let productCard = event.target.closest(".product-card");

    if (event.target.closest(".product-card__link")) {
        localStorage.setItem("currentProduct", JSON.stringify(createProductObject(productCard)));
        window.open("/product.html", "_self");
        return;
    }

    if (event.target.closest(".product-card__button")) {
        let product = createProductObject(productCard);
        basket.push({
            product,
            count: 1
        });

        changeBasketButtonCount("inc");

        productCard.append(createCardLabel(1));

        showCounter(productCard);
        setBasket(basket);
        return;
    }

    let productId = productCard.getAttribute("dataId");
    let currentProductIndex = basket.findIndex(function (value) {
        return productId === value.product.id;
    })
    let currentProduct = basket[currentProductIndex];
    let currentProductPriceSum = currentProduct.product.price * currentProduct.count;

    if (event.target.closest(".product-card__add-button")) {
        let price = currentProductPriceSum + currentProduct.product.price;
        setCardPrice(productCard, price);
        currentProduct.count += 1;
        setCardLabelValue(productCard, currentProduct.count);
    }

    if (event.target.closest(".product-card__remove-button")) {
        if (currentProduct.count > 1) {
            let price = currentProductPriceSum - currentProduct.product.price;
            setCardPrice(productCard, price);
            currentProduct.count -= 1;
            setCardLabelValue(productCard, currentProduct.count);
        } else {
            productCard.querySelector(".product-card__label").remove();
            basket.splice(currentProductIndex, 1);
            hideCounter(productCard);

            changeBasketButtonCount("dec");
        }
    }

    setBasket(basket);
})

function initBasket() {
    let basket = getBasket();
    if (basket.length) {
        document.querySelector("#amountItemsInBucket").innerText = basket.length;
        basket.forEach(function (value) {
            let currentProductCard = document.querySelector(`[dataId="${value.product.id}"]`);
            showCounter(currentProductCard);
            currentProductCard.append(createCardLabel(value.count));
            setCardPrice(currentProductCard, value.product.price * value.count)
        })
    }
}

initBasket();