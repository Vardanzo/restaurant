function showCounter(card) {
    card.querySelector('[tagId="productCardButton"]').classList.add("button_hidden");
    card.querySelector('[tagId="productCardRemoveButton"]').classList.remove("button_hidden");
    card.querySelector('[tagId="productCardAddButton"]').classList.remove("button_hidden");
}

function hideCounter(card) {
    card.querySelector('[tagId="productCardButton"]').classList.remove("button_hidden");
    card.querySelector('[tagId="productCardRemoveButton"]').classList.add("button_hidden");
    card.querySelector('[tagId="productCardAddButton"]').classList.add("button_hidden");
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
    card.querySelector('[tagId="productCardPrice"]').innerText = price + ' ₽';
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
        name: productCard.querySelector('[tagId="productCardTitle"]').innerText,
        description: productCard.querySelector('[tagId="productCardDescription"]').innerText,
        img: productCard.querySelector('[tagId="productCardImg"]').getAttribute("src"),
        weight: parseInt(productCard.querySelector('[tagId="productCardWeight"]').innerText.slice(5)),
        price: parseInt(productCard.querySelector('[tagId="productCardPrice"]').innerText),
        id: productCard.getAttribute("dataId")
    };
}

function canDo(event) {
    return event.target.closest('[tagId="productCardAddButton"]')
        || event.target.closest('[tagId="productCardRemoveButton"]')
        || event.target.closest('[tagId="productCardButton"]')
        || event.target.closest('[tagId="productCardLink"]');
}

function handleLinkClick(productCard) {
    localStorage.setItem("currentProduct", JSON.stringify(createProductObject(productCard)));
    window.open("/product.html", "_self");
}

function handleAddProduct(productCard) {
    let basket = getBasket();
    let product = createProductObject(productCard);
    basket.push({
        product,
        count: 1
    });

    changeBasketButtonCount("inc");

    productCard.append(createCardLabel(1));

    showCounter(productCard);
    setBasket(basket);
}

function handleChangeProductAmount(productCard, direction) {
    let basket = getBasket();
    let productId = productCard.getAttribute("dataId");
    let currentProductIndex = basket.findIndex(function (value) {
        return productId === value.product.id;
    })
    let currentProduct = basket[currentProductIndex];
    let currentProductPriceSum = currentProduct.product.price * currentProduct.count;

    switch (direction) {
        case "+": {
            let price = currentProductPriceSum + currentProduct.product.price;
            setCardPrice(productCard, price);
            currentProduct.count += 1;
            setCardLabelValue(productCard, currentProduct.count);
            break;
        }
        case "-": {
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
            break;
        }
        default: {
            return;
        }
    }
    setBasket(basket);
}

function handleCardClick(event) {
    event.preventDefault();
    if (canDo(event)) {
        let productCard = event.target.closest('[tagId="productCard"]');

        if (event.target.closest('[tagId="productCardLink"]')) {
            handleLinkClick(productCard);
        }

        if (event.target.closest('[tagId="productCardButton"]')) {
            handleAddProduct(productCard);
        }

        if (event.target.closest('[tagId="productCardAddButton"]')) {
            handleChangeProductAmount(productCard, "+")
        }

        if (event.target.closest('[tagId="productCardRemoveButton"]')) {
            handleChangeProductAmount(productCard, "-")
        }
    }
}

document.querySelector("#menuList")?.addEventListener("click", handleCardClick);
document.querySelector(".related-products")?.addEventListener("click", handleCardClick);
document.querySelector(".product-section")?.addEventListener("click", handleCardClick);

function initBasket() {
    let basket = getBasket();
    if (basket.length) {
        document.querySelector("#amountItemsInBucket").innerText = basket.length;
        basket.forEach(function (value) {
            let currentProductCard = document.querySelector(`[dataId="${value.product.id}"]`);
            if (currentProductCard){
                showCounter(currentProductCard);
                currentProductCard.append(createCardLabel(value.count));
                setCardPrice(currentProductCard, value.product.price * value.count);
            }
        })
    }
}

initBasket();