import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTitleACType = ReturnType<typeof changeTitleAC>

type TaskActionsType = RemoveTaskACType
    | changeTaskStatusACType
    | addTaskACType
    | changeTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

const startState: TasksStateType = {
    'todolistId1': [
        {id: '1', title: 'CSS', isDone: false},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
        {id: '1', title: 'bread', isDone: false},
        {id: '2', title: 'milk', isDone: true},
        {id: '3', title: 'tea', isDone: false}
    ]
}
export const taskReducer = (state:TasksStateType, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskID)
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            // if (state[action.todolistId].length === 0)
            // { return {
            //     ...state,
            //     [action.todolistId]: [newTask]
            // }} else {
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {...el, isDone:action.isDone} : el)
            }
        case 'CHANGE-TITLE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {...el, title:action.title} : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]:[]}
        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
            // const {[action.id]:[],...rest} = {...state}
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        taskID,
        todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS-TASK",
        taskID,
        isDone,
        todolistId
    } as const;
};
export const changeTitleAC = (taskID: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TITLE-TASK",
        taskID,
        title,
        todolistId
    } as const;
};

const action = removeTaskAC('2', 'todolistId2')
const endState = taskReducer(startState, action)


