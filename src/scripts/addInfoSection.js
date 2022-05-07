let advantagesSectionItems = Array.from(document.querySelectorAll(".advantages-section__item"));

advantagesSectionItems.forEach(function (element) {
    element.addEventListener("mouseover", function (e) {
        document.querySelector(".info-section__text_active").classList.remove("info-section__text_active");
        document.querySelector("#" + e.target.id + "Description").classList.add("info-section__text_active");
    })
    element.addEventListener("mouseout", function (e) {
        document.querySelector(".info-section__text_active").classList.remove("info-section__text_active");
        document.querySelector(".info-section__text").classList.add("info-section__text_active");
    })
})

document.querySelector(".info-section__button").addEventListener("click", function (){
    window.scrollTo(0,583);
})