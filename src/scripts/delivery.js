let faqItems = document.querySelector(".delivery-section__faq")

function removeActiveStatus() {
    document.querySelector(".faq-item_active")?.classList.remove("faq-item_active");
    document.querySelector(".faq-item__icon_active")?.classList.remove("faq-item__icon_active");
}

faqItems.addEventListener("click", function (event) {
    if (event.target.closest(".faq-item__button")) {
        let currentFaqItem = event.target.closest(".faq-item");
        let currentFaqItemImg = currentFaqItem.querySelector(".faq-item__icon");
        if (currentFaqItem.classList.contains("faq-item_active")) {
            removeActiveStatus();
            return;
        }
        removeActiveStatus();
        currentFaqItemImg.classList.add("faq-item__icon_active");
        currentFaqItem.classList.add("faq-item_active");
    }
})