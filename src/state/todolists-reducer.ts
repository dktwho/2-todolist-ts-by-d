import {TodoListType} from "../App";


export type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }


        default:
            throw new Error('bad action type')
    }
}