import {TaskType} from "../src1/TodoList";
import {v1} from "uuid";


export const taskReducer = (state:TaskType[] ,action:mainACType) => {
    switch (action.type) {
        case "REMOVE-TASK":{
            return state.filter(el => el.id !== action.payload.id)

        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return [task,...state]
        }
        default: return state
    }
}
type mainACType = removeTaskACType | addTaskACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>

export const removeTaskAC = (id:string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id
        }
    } as const
}


export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title}
    } as const
}
