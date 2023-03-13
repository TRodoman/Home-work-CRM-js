import { hideModalWindowEvent, showModalWindow } from "./events.js";
import { createEditProductInput, createProductElement } from "./methods.js";

function showListVideo() {
  const tbodyVideo = document.querySelector("#video");
  const dataVideo = JSON.parse(localStorage.videoBD);

  // Перевірка на те чи отримали ми масив
  if (!Array.isArray(dataVideo)) throw new Error("Ми отримали не масив!!!");

  tbodyVideo.innerHTML = "";
  const tableVideo = dataVideo.map((e, i) => {
    const { movieName, quantity, date, movilink } = e;
    const tr = createProductElement("tr");
    const tds = [
      createProductElement("td", undefined, i + 1),
      createProductElement("td", undefined, movieName),
      createProductElement("td", undefined, date),
      createProductElement("td", undefined, movilink),
      createProductElement("td", undefined, "<span class='icon'>&#128221;</span>", undefined, editClickEvent, e),
      createProductElement("td", undefined, "<span class='icon'>&#128465;</span>"),
    ];
    tr.append(...tds);
    return tr;
  });
  tbodyVideo.append(...tableVideo);
}
  showListVideo();

function editClickEvent(e) {
  // e - event || productObject
  const mw = document.querySelector(".modal-window");
  const product = Object.entries(e).map(([key, value], id) => {
    return createEditProductInput(value, key, id);
  });

  const div = createProductElement("div", "btn-edit-product");
  const save = createProductElement("button", "save-product", "Зберегти", undefined, saveProduct, e);
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

  const arrVideo = JSON.parse(localStorage.videoBD);
  const indexVideo = arrVideo.findIndex((el) => {
    return el.id === oldObject.id;
  });
  arrVideo.splice(indexVideo, 1, newObj);
  localStorage.videoBD = JSON.stringify(arrVideo);
  showListVideo();
}
