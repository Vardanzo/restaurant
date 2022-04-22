let menuListElements = document.getElementsByClassName("restaurant-menu__item");
menuListElements[0].classList.add("restaurant-menu__item_active");

let wrapperWidth = document.querySelector(".wrapper").clientWidth;
let headerBottomSection = document.querySelector(".header__bottom-section");

let areaIds =  Array.from(menuListElements).map((element)=>{
    return element.children[0].getAttribute("href")
})
console.log(areaIds)

window.addEventListener("scroll", function () {
    if (scrollY >= 583) {
        headerBottomSection.classList.add("header__bottom-section_fixed");
        headerBottomSection.style.width = wrapperWidth - 160 + 'px';
    } else {
        headerBottomSection.classList.remove("header__bottom-section_fixed");
        headerBottomSection.style.width = "auto";
    }
})

