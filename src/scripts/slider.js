const ARROW = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13L9 8.04167L12 3" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M7 13L4 8.04167L7 3" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
`
let list = document.querySelectorAll('.glider');
for (const slider of list) {
    let gliderPrev = document.createElement("button");
    gliderPrev.classList.add("glider-contain__button_prev", "glider-contain__button")
    gliderPrev.setAttribute("area-label", "Previous")
    gliderPrev.innerHTML = ARROW;
    let gliderNext = document.createElement("button");
    gliderNext.classList.add("glider-contain__button_next", "glider-contain__button")
    gliderNext.setAttribute("area-label", "Next")
    gliderNext.innerHTML = ARROW;

    slider.parentNode.append(gliderPrev, gliderNext)

    new Glider(slider, {
        slidesToShow: 5,
        exactWidth: true,
        itemWidth: 345,
        draggable: true,
        arrows: {
            prev: gliderPrev,
            next: gliderNext
        }
    })
}

