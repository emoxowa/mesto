const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editButton = document.querySelector(".button_type_edit");
const popup = document.querySelector(".popup");
const editPopup = document.querySelector(".popup-edit");
const createPopup = document.querySelector(".popup-create");
const closeButtons = document.querySelectorAll(".popup__close-icon");
const saveEditButton = document.querySelector(".button_type_save");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#job");
const cards = document.querySelector(".cards");
const addButton = document.querySelector(".button_type_add");

function closePopup(e) {
  let button = e.target;
  let popupElement = button.closest('.popup')
  popupElement.classList.toggle("popup_opened");
} 

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

function openEditPopup() {
  if (!popup.classList.contains("popup_opened") ) {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
  }
} 


//1. Создание шести карточек «из коробки»
function renderCard({name, link}) {
  const templateCard = document.querySelector("#card-template").content;
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = name;
  cardImage.src = link;
  cards.prepend(cardElement);
}

const cardInfo = initialCards.map((item) => {
  return {
    name: item.name,
    link: item.link,
  };
});

function renderCards() {
  cardInfo.forEach(renderCard);
}

//2. Форма добавления карточки
addButton.addEventListener("click", () => {
  createPopup.classList.toggle("popup_opened");
});


//4. Лайк карточки

const toggleLike = () => {
  const likes = document.querySelectorAll(".card__button-like");
  likes.forEach((like) => {
    like.addEventListener("click", (event) =>
      event.target.classList.toggle("card__button-like_added")
    );
  });
};

//5. Удаление карточки
const removeCard = () => {
  const removeButtons = document.querySelectorAll(".card__button-remove");
  removeButtons.forEach((removeButton) => {
    let card = removeButton.closest(".card");
    removeButton.addEventListener("click", () => card.remove());
  });
};


renderCards();
toggleLike();
removeCard();
saveEditButton.addEventListener("click", saveProfile);
editButton.addEventListener("click", openEditPopup);
closeButtons.forEach((closeButton) => closeButton.addEventListener("click", closePopup));
