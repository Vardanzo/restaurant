const NAVIGATION_HEIGHT = 78;

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
            window.scrollBy(0, -100);
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
    return document.documentElement.scrollTop + element.getBoundingClientRect().y;
}

function scrollToTarget(event) {
    let targetId = event.target.getAttribute("to");
    let target = document.getElementById(targetId);
    let targetPosition = getPosition(target);
    let offsetTargetPosition = targetPosition - NAVIGATION_HEIGHT;

    window.scrollTo({
        top: offsetTargetPosition,
        behavior: "smooth",
    })
}

for (const navLink of navLinks) {
    navLink.addEventListener("click", scrollToTarget);
}

let sections = document.querySelectorAll(".menu-list__item");

function changeNavActiveItem() {
    for (let i = 0; i < sections.length; i++) {
        let {y: sectionY, height: sectionHeight} = sections[i].getBoundingClientRect();
        let li = document.querySelector(`[to="${sections[i].id}"]`).parentNode

        if (sectionY <= NAVIGATION_HEIGHT && sectionY > NAVIGATION_HEIGHT - sectionHeight - 52) {
            li.classList.add("restaurant-menu__item_active");
        } else {
            li.classList.remove("restaurant-menu__item_active");
        }
    }
}

window.addEventListener("scroll", function () {
    changeNavActiveItem();
    let headerBottomSection = document.querySelector(".header__bottom-section");
    if (scrollY >= 583) {
        headerBottomSection.classList.add("header__bottom-section_fixed");
        headerBottomSection.style.width = document.querySelector(".wrapper").clientWidth - 160 + 'px';
        scrollBackButton.style.opacity = "1";
    } else {
        headerBottomSection.classList.remove("header__bottom-section_fixed");
        headerBottomSection.style.width = "auto";
        scrollBackButton.style.opacity = "0";

    }
})

document.querySelector(".back-button")?.addEventListener("click", function () {
    history.back();
})