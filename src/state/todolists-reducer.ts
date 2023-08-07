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
            return [{id: v4(), title: action.title, filter: 'all'}, ...state,]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
         }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            throw new Error('bad action type')
    }
}