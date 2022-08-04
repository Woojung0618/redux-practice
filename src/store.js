import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
    return {
        type: ADD,
        text
    }
}

const deleteToDo = (id) => {
    return {
        type: DELETE,
        id
    }
}


const reducer = (state=JSON.parse(localStorage.getItem("toDos")) || [], action) => {
    switch(action.type) {
        case ADD:
            const addToDos = [{text: action.text, id: Date.now(0)}, ...state]
            localStorage.setItem("toDos", JSON.stringify(addToDos))
            return addToDos
        case DELETE:
            const deleteToDos = state.filter(toDo => toDo.id !== action.id);
            localStorage.setItem("toDos", JSON.stringify(deleteToDos));
            return deleteToDos
        default:
            return state
        }       
}

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo,
}

export default store;