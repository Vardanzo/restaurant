const ARROW = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
 viewBox="0 0 54 54" style="enable-background:new 0 0 54 54;" xml:space="preserve" fill="current-color">
<path d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2
C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"/>
<path d="M22.294,40c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L32.88,27
L21.587,15.707c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l11.498,11.498c0.667,0.667,0.667,1.751,0,2.418
L23.001,39.707C22.806,39.902,22.55,40,22.294,40z"/>
</svg>
`;

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

