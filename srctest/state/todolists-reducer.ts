import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export  const todolistsReducer = (state:TodolistType[],action:todolistsReducerType) =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(el=> el.id !== action.payload.todolistId1)
        }
        case 'ADD-TODOLIST':{
            let newTodolistID = v1()
            let newTodolist = {id:newTodolistID, title: action.payload.newTodolistTitle, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE':{

            return state.map(el=> el.id === action.payload.todolistId2 ? {...el, title:action.payload.newTodolistTitle}:el)
    }
        case 'CHANGE-TODOLIST-FILTER':{

            return state.map(el=> el.id === action.payload.todolistId2 ? {...el, filter:action.payload.newFilter}:el)
        }
        default:return state
    }
}
type todolistsReducerType = removeTodoListACType | addTodoListACType | changeNameTodoListACType | changeTodoListFilterACType


type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>
type changeNameTodoListACType = ReturnType<typeof changeNameTodoListAC>
type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const removeTodoListAC = (todolistId1:string) => {
    return {
        type:'REMOVE-TODOLIST',
        payload:{todolistId1}
    } as const
}
export const addTodoListAC = (newTodolistTitle:string) => {
    return {
        type:'ADD-TODOLIST',
        payload:{newTodolistTitle}
    } as const
}
export const changeNameTodoListAC = (todolistId2:string,newTodolistTitle:string) => {
    return {
        type:'CHANGE-TODOLIST-TITLE',
        payload:{todolistId2,newTodolistTitle}
    } as const
}
export const changeTodoListFilterAC = (todolistId2:string,newFilter:FilterValuesType) => {
    return {
        type:'CHANGE-TODOLIST-FILTER',
        payload:{todolistId2,newFilter}
    } as const
}