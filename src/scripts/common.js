let menuListElements = document.getElementsByClassName("restaurant-menu__item");
menuListElements[0].classList.add("restaurant-menu__item_active");

let wrapperWidth = document.querySelector(".wrapper").clientWidth;
let headerBottomSection = document.querySelector(".header__bottom-section");

let areaElements = document.getElementById("menuList").children;

let lastScrolledAreaId;

function menuScroll() {
    for (let i = 0; i < areaElements.length; i++) {
        if (areaElements[i].getBoundingClientRect().top <= 78) {
            lastScrolledAreaId = areaElements[i].getAttribute("id");
        }
    }

    document.getElementsByClassName("restaurant-menu__item_active")[0].classList.remove("restaurant-menu__item_active");
    Array.from(menuListElements).find(function (li) {
        if (li.children[0].getAttribute("href") === "#" + lastScrolledAreaId) {
            li.classList.add("restaurant-menu__item_active");
        }
    })
}


window.addEventListener("scroll", function () {
    if (scrollY >= 583) {
        headerBottomSection.classList.add("header__bottom-section_fixed");
        headerBottomSection.style.width = wrapperWidth - 160 + 'px';
        menuScroll()
    } else {
        headerBottomSection.classList.remove("header__bottom-section_fixed");
        headerBottomSection.style.width = "auto";
    }
})

