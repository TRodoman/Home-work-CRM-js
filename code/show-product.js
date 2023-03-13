import { hideModalWindowEvent, showModalWindow } from "./events.js";
import { createEditProductInput, createProductElement } from "./methods.js";

function showListProduct() {
  const tbodyRest = document.querySelector("#restoration");
  const data = JSON.parse(localStorage.restorationBD);

  // Перевірка на те чи отримали ми масив
  if (!Array.isArray(data)) throw new Error("Ми отримали не масив!!!");

  tbodyRest.innerHTML = "";
  const table = data.map((e, i) => {
    const { productName, quantity, date, price } = e;
    const tr = createProductElement("tr");

    const tds = [
      createProductElement("td", undefined, i + 1),
      createProductElement("td", undefined, productName),
      createProductElement("td", undefined, quantity),
      createProductElement("td", undefined, price),
      createProductElement(
        "td",
        undefined,
        "<span class='icon'>&#128221;</span>",
        undefined,
        editClickEvent,
        e
      ),
      createProductElement(
        "td",
        undefined,
        quantity > 0 ? "&#9989;" : "&#10060;"
      ),
      createProductElement("td", undefined, date),
      createProductElement(
        "td",
        undefined,
        "<span class='icon'>&#128465;</span>"
      ),
    ];
    tr.append(...tds);
    return tr;
  });
  tbodyRest.append(...table);
}

showListProduct();

function editClickEvent(e) {
  // e - event || productObject
  const mw = document.querySelector(".modal-window");
  const product = Object.entries(e).map(([key, value], id) => {
    return createEditProductInput(value, key, id);
  });

  const div = createProductElement("div", "btn-edit-product");
  const save = createProductElement(
    "button",
    "save-product",
    "Зберегти",
    undefined,
    saveProduct,
    e
  );
  div.append(save);

  mw.append(...product, div);
  showModalWindow();
}

function saveProduct(oldObject) {
  hideModalWindowEvent();
  const newObj = {
    id: oldObject.id,
    date: oldObject.date,
  };

  const inputs = document.querySelectorAll(".modal-window input");

  inputs.forEach((el) => {
    if (el.key === "stopList") return;
    newObj[el.key] = el.value;
  });
  newObj.stopList = newObj.quantity > 0 ? false : true;

  const arr = JSON.parse(localStorage.restorationBD);
  const index = arr.findIndex((el) => {
    return el.id === oldObject.id;
  });
  arr.splice(index, 1, newObj);
  localStorage.restorationBD = JSON.stringify(arr);
  showListProduct();
}
