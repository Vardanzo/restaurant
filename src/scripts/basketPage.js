// div.added-product
// img.added-product__img(src=basketProduct.img)
// div.added-product__title #{basketProduct.name}
// br
// span.added-product__description #{basketProduct.description}
// div.product-counter-block
// div
// button.button.product-counter-button.added-product__counter-remove-button(disabled)
// span.added-product__counter 1
// button.button.product-counter-button.added-product__counter-add-button
// span.added-product__price #{basketProduct.price} ₽
// button.button.product-counter-button.added-product__remove-button

let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket)
let currentProducts = basket.map(function (value) {
    return `
    <div class="added-product" dataId="${value.product.id}" tagId="productCard">
        <img class="added-product__img" src="${value.product.img}" alt="${value.product.name}" tagId="productCardImg">
        <div class="added-product__text-wrapper">
            <div class="added-product__title" tagId="productCardTitle">${value.product.name}</div>
            <div class="added-product__description" tagId="productCardDescription">${value.product.description}</div>
        </div>
        <div class="product-counter-block"> 
            <div>
                <button class="button product-counter-button added-product__counter-remove-button" tagId="productCardRemoveButton" ${value.count<=1 && "disabled"}></button>
                <span class="added-product__counter" tagId="counterLabel">${value.count}</span>
                <button class="button product-counter-button added-product__counter-add-button" tagId="productCardAddButton"></button>
            </div>
            <span class="added-product__price" tagId="productCardPrice">${value.product.price * value.count} ₽</span> 
            <button class="button product-counter-button added-product__remove-button" tagId="removeFromBasketButton" ></button>
        </div>
    </div>
    `
})

document.querySelector(".basket-page__products-section").innerHTML=currentProducts.join("")