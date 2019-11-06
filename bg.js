const body = document.querySelector("body");

const IMG_NUMBER = 2;

const paintImage = imgNumber => {
  const image = new Image();
  image.src = `/images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
};

const getRandom = () => {
  const number = Math.floor(Math.random() * 2);
  return number;
};

const init4 = () => {
  const randomNumber = getRandom();
  paintImage(randomNumber);
};
init4();
