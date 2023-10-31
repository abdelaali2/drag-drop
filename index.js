const BODY = document.querySelector("body");
const showSideNavBtn = document.querySelector("#showSideNavBtn");

function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
  showSideNavBtn.classList.add("d-none");
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
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
  newCard.id = cardId;
  newCard.classList.add("card", "text-center", "position-absolute");
  newCard.draggable = true;
  newCard.ondragend = (ev) => {
    newCard.style.left = `${ev.clientX}px`;
    newCard.style.top = `${ev.clientY}px`;
  };

  newCard.style.left = `${x}px`;
  newCard.style.top = `${y}px`;

  newCard.appendChild(createCardHeader(type, cardId));
  newCard.appendChild(createCardBody(type));

  return newCard;
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
  deleteBtn.classList.add("bi", "bi-trash3-fill");

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(deleteBtn);

  return cardHeader;
}

function createCardBody(type) {
  const cardBody = document.createElement(type);
  cardBody.classList.add("card-body", "px-3");
  return cardBody;
}
