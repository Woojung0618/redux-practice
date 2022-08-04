import { createStore } from "redux";
import { createAction, createReducer, configureStore } from "@reduxjs/toolkit"

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

// const reducer = (state=JSON.parse(localStorage.getItem("toDos")) || [], action) => {
//     switch(action.type) {
//         case addToDo.type:
//             console.log('action:', action)
//             const addToDos = [{text: action.payload, id: Date.now(0)}, ...state]
//             localStorage.setItem("toDos", JSON.stringify(addToDos))
//             return addToDos
//         case deleteToDo.type:
//             const deleteToDos = state.filter(toDo => toDo.id !== action.payload);
//             localStorage.setItem("toDos", JSON.stringify(deleteToDos));
//             return deleteToDos
//         default:
//             return state
//         }       
// }

const reducer = createReducer([], {
    [addToDo]: (state, action) => { 
        // state.push({text: action.payload, id: Date.now()});
        state.unshift({text: action.payload, id: Date.now()});
    },
    [deleteToDo]: (state, action) => {
        return state.filter(toDo => toDo.id !== action.payload);
    }
})


const store = configureStore({ reducer });

export const actionCreators = {
    addToDo,
    deleteToDo,
}

export default store;