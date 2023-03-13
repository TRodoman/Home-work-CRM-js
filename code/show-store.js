import { hideModalWindowEvent, showModalWindow } from "./events.js";
import { createEditProductInput, createProductElement } from "./methods.js";

function showListStore() {
  const tbodyStore = document.querySelector("#store");
  const dataStore = JSON.parse(localStorage.storeBD);

  // Перевірка на те чи отримали ми масив
  if (!Array.isArray(dataStore)) throw new Error("Ми отримали не масив!!!");

  tbodyStore.innerHTML = "";
  const tableStore = dataStore.map((e, i) => {
    const { productName, quantity, date, porductPrice } = e;
    const tr = createProductElement("tr");
    const tds = [
      createProductElement("td", undefined, i + 1),
      createProductElement("td", undefined, productName),
      createProductElement("td", undefined, quantity),
      createProductElement("td", undefined, porductPrice),
      createProductElement("td", undefined, "<span class='icon'>&#128221;</span>", undefined, editClickEvent, e),
      createProductElement("td", undefined, quantity > 0 ? "&#9989;" : "&#10060;"),
      createProductElement("td", undefined, date),
      createProductElement("td", undefined, "<span class='icon'>&#128465;</span>"),
    ];
    tr.append(...tds);
    return tr;
  });
  tbodyStore.append(...tableStore);
}

showListStore();

function editClickEvent(e) {
  // e - event || productObject
  const mw = document.querySelector(".modal-window");
  const productStore = Object.entries(e).map(([key, value], id) => {
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

  mw.append(...productStore, div);
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

  const arrStore = JSON.parse(localStorage.storeBD);
  const indexStore = arrStore.findIndex((el) => {
    return el.id === oldObject.id;
  });
  arrStore.splice(indexStore, 1, newObj);
  localStorage.storeBD = JSON.stringify(arrStore);
  showListStore();
}

// this.movieName = movieName;
//   this.movieReleasedYear = movieReleasedYear;
//   this.movieImage = movieImage;
//   this.movieDirector = movieDirector;
//   this.movieDescription = movieDescription;
//   this.actors = actors.split(",");
