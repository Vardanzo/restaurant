"use strict";var faqItems=document.querySelector(".delivery-section__faq");function removeActiveStatus(){var e;null!=(e=document.querySelector(".faq-item_active"))&&e.classList.remove("faq-item_active"),null!=(e=document.querySelector(".faq-item__icon_active"))&&e.classList.remove("faq-item__icon_active")}faqItems.addEventListener("click",function(e){var t;e.target.closest(".faq-item__button")&&(t=(e=e.target.closest(".faq-item")).querySelector(".faq-item__icon"),e.classList.contains("faq-item_active")?removeActiveStatus():(removeActiveStatus(),t.classList.add("faq-item__icon_active"),e.classList.add("faq-item_active")))});