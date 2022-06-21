import {FilterValuesType} from "./App";


export const filterReducer = (state:FilterValuesType ,action:filterACType) => {
    switch (action.type) {
        case "FILTER-TASK":{
            return action.payload.value

        }

        default: return state
    }
}
type filterACType = ReturnType<typeof filterAC>

export const filterAC = (value:FilterValuesType) => {
    return {
        type: "FILTER-TASK",
        payload: {
            value
        }
    } as const
}



