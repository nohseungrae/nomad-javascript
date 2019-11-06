const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

const deleteToDo = event => {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(todo => {
    console.log(todo.id, li.id);
    return todo.id !== parseInt(li.id);
  });
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
};

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

const paintToDo = text => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;

  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
};

const handleToDoSubmit = event => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
};

const init3 = () => {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDoSubmit);
};
init3();
