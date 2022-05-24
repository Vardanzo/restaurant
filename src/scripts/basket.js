function showCounter(card) {
    if (card.querySelector('[tagId="productCardButton"]')) {
        card.querySelector('[tagId="productCardButton"]').classList.add("button_hidden");
        card.querySelector('[tagId="productCardRemoveButton"]').classList.remove("button_hidden");
        card.querySelector('[tagId="productCardAddButton"]').classList.remove("button_hidden");
    }
}

function hideCounter(card) {
    if (card.querySelector('[tagId="productCardButton"]')) {
        card.querySelector('[tagId="productCardButton"]').classList.remove("button_hidden");
        card.querySelector('[tagId="productCardRemoveButton"]').classList.add("button_hidden");
        card.querySelector('[tagId="productCardAddButton"]').classList.add("button_hidden");
    }
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
    label.setAttribute("tagId", "counterLabel")
    label.innerText = count;
    return label;
}

function setCardLabelValue(card, value) {
    card.querySelector('[tagId="counterLabel"]').innerText = value;
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
        || event.target.closest('[tagId="productCardLink"]')
        || event.target.closest('[tagId="removeFromBasketButton"]');
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
            if (location.pathname === "/basket.html") {
                let removeButton = productCard.querySelector('[tagId="productCardRemoveButton"]');
                if (removeButton.getAttribute("disabled")) {
                    removeButton.removeAttribute("disabled");
                }
            }
            break;

        }
        case "-": {
            if (currentProduct.count > 1) {
                let price = currentProductPriceSum - currentProduct.product.price;
                setCardPrice(productCard, price);
                currentProduct.count -= 1;
                setCardLabelValue(productCard, currentProduct.count);
                if (location.pathname === "/basket.html") {
                    if (currentProduct.count <= 1) {
                        productCard.querySelector('[tagId="productCardRemoveButton"]').setAttribute("disabled", "true")
                    }
                }
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

function removeFromBasket(productCard) {
    let basket = getBasket();
    let currentProductInBasket = basket.findIndex(function (value) {
        return value.product.id === productCard.getAttribute("dataId");
    })
    basket.splice(currentProductInBasket, 1);
    setBasket(basket);

    let addToOrder = JSON.parse(localStorage.getItem("addToOrder"));
    if (addToOrder) {
        let addToOrderProduct = addToOrder.find(function (value) {
            return value.id === productCard.getAttribute("dataId");
        })
        if (addToOrderProduct) {
            let newProduct = `
             <div class="add-to-order__item" dataId="${addToOrderProduct.id}" dataDescription="${addToOrderProduct.description}" dataWeight="${addToOrderProduct.weight}">
                <img class="add-to-order__img" src="${addToOrderProduct.img}" alt="${addToOrderProduct.name}">
                <div class="add-to-order__title">${addToOrderProduct.name}</div> 
                <div class="add-to-order__text-block">
                    <span class="add-to-order__text">Добавить</span> 
                    <button class="button add-to-order__add-button add-to-order__add-button-counter"></button>
                </div>
                <div class="add-to-order__price">${addToOrderProduct.price} ₽</div> 
             </div>
            `
            document.querySelector(".add-to-order__items-block").append(newProduct);
        }

    }

    productCard.remove();
    changeBasketButtonCount("dec");
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
        if (event.target.closest('[tagId="removeFromBasketButton"]')) {
            removeFromBasket(productCard);

        }
    }
}

document.querySelector('[tagId="cardsSection"]')?.addEventListener("click", handleCardClick);

function initBasket() {
    let basket = getBasket();
    if (basket.length) {
        document.querySelector("#amountItemsInBucket").innerText = basket.length;
        if (location.pathname !== "/basket.html") {
            basket.forEach(function (value) {
                let currentProductCard = document.querySelector(`[dataId="${value.product.id}"]`);
                if (currentProductCard) {
                    showCounter(currentProductCard);
                    currentProductCard.append(createCardLabel(value.count));
                    setCardPrice(currentProductCard, value.product.price * value.count);
                }
            })
        }
    }
}

initBasket();

window.basketAPI = {
    changeBasketButtonCount,
    getBasket,
    setBasket
};