const NAVIGATION_HEIGHT = 78;
const BORDER_WIDTH = 1;
const SCROLL_STEP = 100;
const MENU_LIST_START_Y = 583;
const NAV_PADDING_SUM = 160;

function createScrollBackButton() {
    let scrollBackButton = document.createElement('button');
    scrollBackButton.classList.add("scroll-back-button")
    scrollBackButton.innerHTML = `
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M13.0607 0.939577C12.4749 0.353795 11.5252 0.353801 10.9394 0.939592L1.3935 10.4856C0.807718 11.0714 0.807724 12.0211 1.39351 12.6069C1.9793 13.1927 2.92905 13.1927 3.51483 12.6069L12.0001 4.12156L20.4854 12.6068C21.0712 13.1926 22.0209 13.1926 22.6067 12.6068C23.1925 12.021 23.1925 11.0712 22.6067 10.4855L13.0607 0.939577ZM13.5001 4.0001L13.5 2.00023L10.5 2.00025L10.5001 4.00012L13.5001 4.0001Z" fill="#222021"/>
            </svg>
            `

    function scrollToTop() {
        if (scrollY > 0) {
            window.scrollBy(0, -SCROLL_STEP);
            setTimeout(scrollToTop, 20);
        }
    }

    scrollBackButton.addEventListener("click", scrollToTop)
    return scrollBackButton;
}

let scrollBackButton = createScrollBackButton();
document.querySelector("body").append(scrollBackButton);

let navLinks = document.querySelectorAll(".restaurant-menu__link");

function getPosition(element) {
    return document.documentElement.scrollTop + element.getBoundingClientRect().y + BORDER_WIDTH;
}

function handleClickNavMenuItem(event) {
    let targetId = event.target.getAttribute("to");
    scrollToTarget(targetId);
}

function scrollToTarget(targetId) {
    let target = document.getElementById(targetId);
    let targetPosition = getPosition(target);
    let offsetTargetPosition = targetPosition - NAVIGATION_HEIGHT;

    window.scrollTo({
        top: offsetTargetPosition,
        behavior: "smooth",
    })
}

function changeToMainPage(event) {
    history.pushState({targetId: event.target.getAttribute("to")}, null, "/")
    history.go(0);
}

let sections = document.querySelectorAll(".menu-list__item");

for (const navLink of navLinks) {
    if (sections.length) {
        navLink.addEventListener("click", handleClickNavMenuItem);
    } else {
        navLink.addEventListener("click", changeToMainPage);
    }
}

function changeNavActiveItem() {
    if (sections.length) {
        for (let i = 0; i < sections.length; i++) {
            let {y: sectionY, height: sectionHeight} = sections[i].getBoundingClientRect();
            let li = document.querySelector(`[to="${sections[i].id}"]`).parentNode

            if (sectionY <= NAVIGATION_HEIGHT && sectionY > NAVIGATION_HEIGHT - sectionHeight) {
                li.classList.add("restaurant-menu__item_active");
            } else {
                li.classList.remove("restaurant-menu__item_active");
            }
        }
    }
}

function setMenuListPadding(value) {
    let menuList = document.querySelector(".menu-list");
    if (menuList) {
        menuList.style.paddingTop = value;
    }
}

window.addEventListener("scroll", function () {
    if (location.pathname !== "/ordering.html") {
        changeNavActiveItem();
        let headerBottomSection = document.querySelector(".header__bottom-section");
        if (scrollY >= MENU_LIST_START_Y) {
            headerBottomSection.classList.add("header__bottom-section_fixed");
            headerBottomSection.style.width = document.querySelector(".wrapper").clientWidth - NAV_PADDING_SUM + 'px';
            setMenuListPadding(`${NAVIGATION_HEIGHT}px`);
            scrollBackButton.style.opacity = "1";
        } else {
            headerBottomSection.classList.remove("header__bottom-section_fixed");
            headerBottomSection.style.width = "auto";
            scrollBackButton.style.opacity = "0";
            setMenuListPadding("0");
        }
    } else {
        if (scrollY >= MENU_LIST_START_Y) {
            scrollBackButton.style.opacity = "1";
        } else {
            scrollBackButton.style.opacity = "0";
        }
    }
})

document.querySelector(".back-button")?.addEventListener("click", function () {
    history.back();
})

function checkHistoryState() {
    let targetId = history.state?.targetId;
    if (targetId) {
        scrollToTarget(targetId);
    }
}

checkHistoryState();

document.querySelector(".header__link").addEventListener("click", function (e) {
    e.preventDefault();
    let modal = document.querySelector(".modal");
    if (window.basketAPI.getBasket().length) {
        window.open("/basket.html", "_self");
    } else {
        modal.querySelector(".modal__caption").innerHTML= "Корзина пуста"
        let basketEmptyImg = document.createElement("img");
        basketEmptyImg.setAttribute("src", "assets/icons/basket-empty.svg");
        basketEmptyImg.style.marginBottom = "14px";
        basketEmptyImg.classList.add("modal__basket-img")
        modal.querySelector(".modal__content").prepend(basketEmptyImg);
        modal.classList.remove("modal_hide");
        document.querySelector("body").style.overflow = "hidden";
    }
})

function closingModal(){
    let modal = document.querySelector(".modal");
    modal.querySelector(".modal__basket-img")?.remove();
    modal.querySelector(".modal__caption").innerHTML= "";
    modal.querySelector(".modal__description").innerHTML= "";
    modal.classList.add("modal_hide");
    document.querySelector("body").style.overflow = "initial";
}

document.querySelector('.modal__back').addEventListener("click", closingModal);
document.querySelector(".modal__exit-button").addEventListener("click", closingModal);

document.querySelector(".modal__back-to-menu").addEventListener("click", function (e){
    if (location.pathname === "/"){
        closingModal();
    }else {
        window.open("/", "_self");
    }
})