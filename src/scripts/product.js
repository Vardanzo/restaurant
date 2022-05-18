
let currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
document.querySelector(".product-section").setAttribute("dataId", currentProduct.id)
document.querySelector(".info-block__title").innerText= currentProduct.name;
document.querySelector(".info-block__text").innerText= currentProduct.description;
document.querySelector(".info-block__price").innerText= `${currentProduct.price} ₽`;
document.querySelector(".info-block__weight").innerText= `Вес ${currentProduct.weight} г`;
document.querySelector(".product-section__img").setAttribute("src", currentProduct.img);