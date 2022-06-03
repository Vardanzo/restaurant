const DELIVERY_TYPE = {
    delivery: "доставка",
    pickup: "самовывоз"
}

const PAYMENT_TYPE = {
    online: "онлайн",
    expeditor: "картой курьеру",
    cash: "наличными"
}

const CALLBACK = {
    yes: "да",
    no: "нет"
}

document.querySelector("#amountItemsInBucket").innerText = JSON.parse(localStorage.getItem("basket")).length;

let radios = document.querySelectorAll(".switch");
radios.forEach(function (item) {
    let switchBlock = item.querySelector(".switch__block");
    item.addEventListener("click", function (e) {
        if (e.target.closest(".switch__classic-button")) {
            switchBlock.style.left = e.target.getBoundingClientRect().left - item.getBoundingClientRect().left + 'px';
        }
    })
})

document.querySelector('[dataId="delivery"]').addEventListener("click", function (e) {
    if (e.target.closest(".switch__classic-button")) {
        let currentInput = e.target.value;
        if (currentInput === "delivery") {
            document.querySelector(".delivery").classList.remove("display_hide");
            document.querySelector(".pickup").classList.add("display_hide");
        } else {
            document.querySelector(".delivery").classList.add("display_hide");
            document.querySelector(".pickup").classList.remove("display_hide");
        }
    }
})

document.querySelector('[dataId="deliveryTime"]').addEventListener("click", function (e) {
    if (e.target.closest(".switch__classic-button")) {
        let currentInput = e.target.value;
        if (currentInput === "inTime") {
            document.querySelector(".date-time").classList.remove("display_hide");
        } else {
            document.querySelector(".date-time").classList.add("display_hide");
        }
    }
})
let removeButton = document.querySelector(".person-counter__remove-button");
let personCounter = document.querySelector(".person-counter__number")
let count = 1;
removeButton.addEventListener("click", function (e) {
    if (count === 1) {
        removeButton.setAttribute("disabled", "true");
    } else {
        count -= 1;
        personCounter.innerHTML = count;
    }
})

let addButton = document.querySelector(".person-counter__add-button");
addButton.addEventListener("click", function (e) {
    count += 1;
    personCounter.innerHTML = count;
    removeButton.removeAttribute("disabled");
})

function closeDropDown(dropDownList, dropDownButton) {
    dropDownList.classList.remove("drop-down__list_active");
    dropDownButton.classList.remove("drop-down__button_active");
}

function openDropDown(dropDownList, dropDownButton) {
    dropDownList.classList.add("drop-down__list_active");
    dropDownButton.classList.add("drop-down__button_active");
}

document.querySelector(".drop-down").addEventListener("click", function (e) {
    let dropDownList = document.querySelector(".drop-down__list");
    let dropDownButton = e.target.closest(".drop-down__button");
    if (dropDownButton) {
        if (dropDownList.classList.contains("drop-down__list_active")) {
            closeDropDown(dropDownList, dropDownButton);
        } else {
            openDropDown(dropDownList, dropDownButton);
        }
        return;
    }
    let dropDownListItem = e.target.closest(".drop-down__list-item");
    if (dropDownListItem) {
        if (!dropDownListItem.classList.contains("drop-down__list-item_selected")) {
            document.querySelector(".drop-down__list-item_selected")?.classList.remove("drop-down__list-item_selected");
            dropDownListItem.classList.add("drop-down__list-item_selected");
            let dropDownButton = document.querySelector(".drop-down__button")
            dropDownButton.querySelector(".drop-down__button-title").innerHTML = dropDownListItem.innerHTML;
            closeDropDown(dropDownList, dropDownButton);
        }
    }
})

document.addEventListener("click", function (e) {
    if (document.querySelector(".drop-down__list_active")) {
        if (!e.target.closest(".drop-down")) {
            closeDropDown(document.querySelector(".drop-down__list"), document.querySelector(".drop-down__button"));
        }
    }
})

function showLateDelivery() {
    let currentMs = Date.now();
    let closingDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 20, 50);
    let closingTimeMs = closingDate.getTime();
    if (currentMs > closingTimeMs) {
        document.querySelector(".late-delivery").classList.remove("display_hide");
    }
}

showLateDelivery();

function createFullAddress(address) {
    let fullAddress = "";
    if (address.street) {
        fullAddress += `Ул. ${address.street}`
    }
    if (address.house) {
        fullAddress += ` дом ${address.house}`
    }
    if (address.apartment) {
        fullAddress += ` кв. ${address.apartment}`
    }
    if (address.entrance) {
        fullAddress += ` подъезд ${address.entrance}`
    }
    if (address.floor) {
        fullAddress += ` этаж ${address.floor}`
    }
    return fullAddress;
}

function mappingOrder(order) {
    return `
    <div>
        <h4 class="modal__h4">Детали заказа:</h4>
        <table class="modal__order-details">
            <tr>
                <td>
                Имя: 
                </td>
                <td>
                ${order.name}
                </td>
            </tr>
            <tr>
                <td>
                Телефон: 
                </td>
                <td>
                ${order.phone}
                </td>
            </tr>
            <tr>
                <td>
                Тип доставки: 
                </td>
                <td>
                ${DELIVERY_TYPE[order.deliveryType]}
                </td>
            </tr>
            <tr>
                <td>
                Тип оплаты: 
                </td>
                <td>
                ${PAYMENT_TYPE[order.paymentType]}
                </td>
            </tr>
            <tr>
                <td>
                Количество персон: 
                </td>
                <td>
                ${order.personCount}
                </td>
            </tr>
            <tr>
                <td>
                Хотите мы перезвоним: 
                </td>
                <td>
                ${CALLBACK[order.callBack]}
                </td>
            </tr>
            ${order.address && `
            <tr>
                <td>
                Адрес доставки: 
                </td>
                <td>
                ${createFullAddress(order.address)}
                </td>
            </tr>
            <tr>
                <td>
                Коментарий: 
                </td>
                <td>
                ${order.address.comments}
                </td>
            </tr>`}
            ${order.chosenRestaurant ? `
            <tr>
                <td>
                Выбранный ресторан: 
                </td>
                <td>
                ${order.chosenRestaurant}
                </td>
            </tr>` : ""}
            ${order.time ? `
            <tr>
                <td>
                Ко времени: 
                </td>
                <td>
                ${order.time}
                </td>
            </tr>` : ""}
        </table>
    </div>
    `
}

let orderPageForm = document.querySelector(".order-page__form");
orderPageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(orderPageForm);
    if (formData.get("consentToProcessingOfPD") !== "on") {
        return;
    }
    let order = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        deliveryType: formData.get("delivery"),
        paymentType: formData.get("payment"),
        deliveryTime: formData.get("deliveryTime"),
        personCount: document.querySelector(".person-counter__number").innerHTML,
        callBack: formData.get("callBack")
    };
    if (order.deliveryType === "pickup") {
        order.chosenRestaurant = document.querySelector(".drop-down__button-title").innerHTML;
    } else {
        order.address = {
            street: formData.get("street"),
            house: formData.get("house"),
            apartment: formData.get("apartment"),
            entrance: formData.get("entrance"),
            floor: formData.get("floor"),
            comments: formData.get("comments")
        }
    }
    if (order.deliveryTime === "inTime") {
        order.time = formData.get("time");
    }
    let modal = document.querySelector(".modal");
    modal.querySelector(".modal__caption").innerHTML = "Заказ оформлен";
    modal.querySelector(".modal__description").innerHTML = mappingOrder(order);
    document.querySelector("body").style.overflow = "hidden";
    modal.classList.remove("modal_hide");
    localStorage.setItem("basket", JSON.stringify([]));
    localStorage.setItem("addToOrder", JSON.stringify([]));
})

document.querySelector(".check__box").addEventListener("change", function (e) {
    let checkoutButton = document.querySelector(".button.checkout__button");
    if (e.currentTarget.checked) {
        checkoutButton.removeAttribute("disabled");
    } else {
        checkoutButton.setAttribute("disabled", "true");
    }
})

