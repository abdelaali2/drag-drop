const BODY = document.querySelector("body");
console.log("BODY", BODY);

function createTextArea(ev, el) {
  const xLocation = ev.clientX;
  const yLocation = ev.clientY;
  // const title = el.innerText();
  console.log("title", typeof el);
  const newCard = createCard(xLocation, yLocation);
  console.log("newCard", newCard);
  BODY.appendChild(newCard);
}

function createCard(x, y, title) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.position = "absolute";
  newCard.style.left = `${x}px`;
  newCard.style.top = `${y}px`;
  newCard.style.minWidth = `250px`;
  newCard.style.minHeight = `100px`;
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  // cardHeader.innerText(title || "kkkk");
  newCard.appendChild(cardHeader);
  return newCard;
}
