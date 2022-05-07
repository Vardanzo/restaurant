{
    document.querySelector(".restaurant-menu__item").classList.add("restaurant-menu__item_active");

    let lastScrolledAreaId;

    function menuScroll() {
        let areaElements = document.getElementById("menuList").children;

        for (let i = 0; i < areaElements.length; i++) {
            if (areaElements[i].getBoundingClientRect().top <= 78) {
                lastScrolledAreaId = areaElements[i].getAttribute("id");
            }
        }

        document.querySelector(".restaurant-menu__item_active")?.classList.remove("restaurant-menu__item_active");

        let menuListElements = document.getElementsByClassName("restaurant-menu__item");
        Array.from(menuListElements).find(function (li) {
            if (li.children[0].getAttribute("href") === "#" + lastScrolledAreaId) {
                li.classList.add("restaurant-menu__item_active");
            }
        })
    }

    function createScrollBackButton() {
        let scrollBackButton = document.createElement('button');
        scrollBackButton.classList.add("scroll-back-button")
        scrollBackButton.innerHTML = `
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M13.0607 0.939577C12.4749 0.353795 11.5252 0.353801 10.9394 0.939592L1.3935 10.4856C0.807718 11.0714 0.807724 12.0211 1.39351 12.6069C1.9793 13.1927 2.92905 13.1927 3.51483 12.6069L12.0001 4.12156L20.4854 12.6068C21.0712 13.1926 22.0209 13.1926 22.6067 12.6068C23.1925 12.021 23.1925 11.0712 22.6067 10.4855L13.0607 0.939577ZM13.5001 4.0001L13.5 2.00023L10.5 2.00025L10.5001 4.00012L13.5001 4.0001Z" fill="#222021"/>
            </svg>
            `
        scrollBackButton.addEventListener("click", function () {
            window.scrollTo(0, 0)
        })
        return scrollBackButton;
    }

    let scrollBackButton = createScrollBackButton();

    window.addEventListener("scroll", function () {
        let headerBottomSection = document.querySelector(".header__bottom-section");
        if (scrollY >= 583) {
            headerBottomSection.classList.add("header__bottom-section_fixed");
            headerBottomSection.style.width = document.querySelector(".wrapper").clientWidth - 160 + 'px';
            menuScroll()

            document.querySelector("body").append(scrollBackButton)

        } else {
            headerBottomSection.classList.remove("header__bottom-section_fixed");
            headerBottomSection.style.width = "auto";

            scrollBackButton.remove()
        }
    })
}