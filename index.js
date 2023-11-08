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
  finalCard.style.left = `${x}px`;
  finalCard.style.top = `${y}px`;
  finalCard.style.zIndex = 10;

  newCard.draggable = true;
  newCard.ondragend = (ev) => {
    finalCard.style.left = `${ev.clientX}px`;
    finalCard.style.top = `${ev.clientY}px`;
  };
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
    const currentText = cardBody.innerText || cardBody.value;
    // Data processing
    cardBody.dataset.input = currentText;
    cardBody.dataset.output = currentText.toUpperCase();
  });
  return cardBody;
}

function attachControlBtns(card) {
  const targetElem = card.querySelector(".card-body");
  const beforeControlBtn = document.createElement("button");
  beforeControlBtn.classList.add("ctrlBtn");
  beforeControlBtn.onclick = () => {
    const input = linkingFeature.getData();
    const { left, top } = beforeControlBtn.getBoundingClientRect();
    const coords = { x: left, y: top };
    if (input) {
      targetElem.dataset.input = input;
      targetElem.innerText = input;
      targetElem.value = input;
    }
    linkingFeature.setPointB(coords);
    createLinkingLine();
  };

  const afterControlBtn = document.createElement("button");
  afterControlBtn.classList.add("ctrlBtn");
  afterControlBtn.onclick = () => {
    const output = targetElem.dataset.output;
    const { left, top } = afterControlBtn.getBoundingClientRect();
    const coords = { x: left, y: top };
    if (output) {
      linkingFeature.setData(output);
    }
    linkingFeature.setPointA(coords);
  };

  const finalCard = document.createElement("div");
  finalCard.appendChild(beforeControlBtn);
  finalCard.appendChild(card);
  finalCard.appendChild(afterControlBtn);
  return finalCard;
}

// State Management
const linkingFeature = {
  data: null,
  pointA: null,
  pointB: null,
  setData(data) {
    this.data = data;
  },
  getData() {
    return this.data;
  },
  setPointA(pointA) {
    this.pointA = pointA;
  },
  getPointA() {
    return this.pointA;
  },
  setPointB(pointB) {
    this.pointB = pointB;
  },
  getPointB() {
    return this.pointB;
  },
};

function createLinkingLine() {
  const line = document.createElement("div");
  const pointA = linkingFeature.getPointA();
  const pointB = linkingFeature.getPointB();

  if (!pointA || !pointB) return;

  console.log("pointA", pointA);
  console.log("pointB", pointB);

  const distance = Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );

  const angle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);

  line.style.position = "absolute";
  line.style.zIndex = 5;
  line.style.left = `${Math.min(pointA.x, pointB.x)}px`;
  line.style.top = `${Math.max(pointA.y, pointB.y)}px`;
  line.style.width = `${distance}px`;
  line.style.transform = `rotate(${angle}rad)`;
  line.style.border = "2px solid black";

  line.ondblclick = () => line.remove();
  line.onmouseenter = () => {
    line.style.border = "3px solid #2c4ceb";
  };
  line.onmouseleave = () => {
    line.style.border = "2px solid black";
  };

  console.log("line.getBoundingClientRect()", line.getBoundingClientRect());

  BODY.appendChild(line);
}
