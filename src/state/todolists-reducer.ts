import {TodoListType} from "../App";
import {v4} from "uuid";


export type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [ {id: v4(), title: action.title, filter: 'all'}, ...state,]
        }
        default:
            throw new Error('bad action type')
    }
}