const BODY = document.querySelector("body");
const showSideNavBtn = document.querySelector("#showSideNavBtn");
const sideNav = document.querySelector("#mySidenav");

function openNav() {
  sideNav.style.width = "150px";
  showSideNavBtn.classList.add("d-none");
}

function closeNav() {
  sideNav.style.width = "0";
  showSideNavBtn.classList.remove("d-none");
}

function createNewElement(ev, type) {
  const xLocation = ev.clientX;
  const yLocation = ev.clientY;
  BODY.appendChild(createCard(xLocation, yLocation, type));
}

function createCard(x, y, type) {
  const newCard = document.createElement("div");
  const cardId = Math.random().toString();

  newCard.appendChild(createCardHeader(type, cardId));
  newCard.appendChild(createCardBody(type));

  const finalCard = attachControlBtns(newCard, cardId);

  finalCard.id = cardId;
  finalCard.classList.add(
    "position-absolute",
    "d-flex",
    "flex-row",
    "align-items-center"
  );
  newCard.draggable = true;
  newCard.ondragend = (ev) => {
    finalCard.style.left = `${ev.clientX}px`;
    finalCard.style.top = `${ev.clientY}px`;
  };

  finalCard.style.left = `${x}px`;
  finalCard.style.top = `${y}px`;
  newCard.style.minHeight = `10rem`;
  newCard.style.minWidth = `12rem`;
  newCard.classList.add("card", "text-center", "mx-1");

  return finalCard;
}

function createCardHeader(title, cardId) {
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "d-flex", "justify-content-between");
  cardHeader.style.cursor = "grab";

  const cardTitle = document.createElement("h3");
  cardTitle.innerText = title.toUpperCase();

  const deleteBtn = document.createElement("h3");
  deleteBtn.onclick = () => {
    document.getElementById(cardId).remove();
  };
  deleteBtn.classList.add("bi", "bi-trash3-fill", "text-danger");
  deleteBtn.style.cursor = "pointer";

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(deleteBtn);

  return cardHeader;
}

function createCardBody(type) {
  const cardBody = document.createElement(type);
  cardBody.classList.add("card-body", "px-3");
  cardBody.contentEditable = true;
  cardBody.addEventListener("input", () => {
    cardBody.dataset.input = cardBody.innerText || cardBody.value;
  });
  return cardBody;
}

function attachControlBtns(card) {
  const targetElem = card.querySelector(".card-body");
  const beforeControlBtn = document.createElement("button");
  beforeControlBtn.classList.add("ctrlBtn");
  beforeControlBtn.onclick = () => {
    console.log(targetElem.dataset.input || "No Input Yet");
  };

  const afterControlBtn = document.createElement("button");
  afterControlBtn.classList.add("ctrlBtn");
  afterControlBtn.onclick = () => {
    console.log(targetElem.dataset.output || "No Output Yet");
  };

  const finalCard = document.createElement("div");
  finalCard.appendChild(beforeControlBtn);
  finalCard.appendChild(card);
  finalCard.appendChild(afterControlBtn);
  return finalCard;
}
