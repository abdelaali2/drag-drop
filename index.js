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
  newCard.classList.add("card", "text-center", "position-absolute");
  newCard.draggable = true;
  newCard.ondragend = (ev) => {
    newCard.style.left = `${ev.clientX}px`;
    newCard.style.top = `${ev.clientY}px`;
  };

  newCard.style.left = `${x}px`;
  newCard.style.top = `${y}px`;
  newCard.style.minWidth = `250px`;
  newCard.style.minHeight = `100px`;

  newCard.appendChild(createCardHeader(type));
  newCard.appendChild(createCardBody(type));

  return newCard;
}

function createCardHeader(title) {
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.innerText = title.toUpperCase();
  return cardHeader;
}

function createCardBody(type) {
  const cardBody = document.createElement(type);
  cardBody.classList.add("card-body", "px-3");
  return cardBody;
}
