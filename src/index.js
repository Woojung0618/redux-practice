
import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// reducer : state(data)를 modify 하는 function
const ADD = "ADD";
const MINUS = "MINUS";
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1
    case MINUS:
      return count - 1
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState()
}

countStore.subscribe(onChange);


const handleAdd = () => {
  countStore.dispatch({ type: ADD })
}

const handleMinus = () => {
  countStore.dispatch({ type: MINUS })
}

add.addEventListener("click", handleAdd)
minus.addEventListener("click", handleMinus)


// TO DO List

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");


const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {  // only return action. 보통 reducer 위에 위치
  return {
    type: ADD_TODO,
    text
  }
}

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      // return [...state, { text: action.text }]; // 새로 추가되는 todo가 뒤에 위치
      return [newToDoObj, ...state]; // 새로 추가되는 todo가 앞에 위치
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== parseInt(action.id));
      return cleaned;
    default:
      return state;
  }
};

// ** Don't Mutate State **
// 기존의 object를 변형시키지 말고 새로운 object를 반환하라
// ADD
// return state.push(action.text) => X 
// DELETE
// splice => X
// filter => O


const store = createStore(reducer);

// store.subscribe(() => console.log(store.getState()))

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(paintToDos);

const dispatchAddTodo = text => {
  // store.dispatch({ type: ADD_TODO, text });
  store.dispatch(addToDo(text));
}

const dispatchDeleteTodo = (e) => {
  e.preventDefault();
  const id = parseInt(e.target.parentNode.id);
  // store.dispatch({ type: DELETE_TODO, id });
  store.dispatch(deleteToDo(id));
}

// const createTodo = toDo => {
//     const li = document.createElement("li");
//     li.innerText = toDo;
//     ul.appendChild(li);
// }

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  // store.dispatch({ type: ADD_TODO, text: toDo })
  dispatchAddTodo(toDo);
}

form.addEventListener("submit", onSubmit);