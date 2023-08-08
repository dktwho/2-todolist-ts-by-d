import {FilterValueType, TodoListType} from "../App";
import {v4} from "uuid";


type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

type ActionsTypes = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType


export const todolistsReducer = (state: TodoListType[], action: ActionsTypes): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [{id: v4(), title: action.title, filter: 'all'}, ...state,]
        }

        case 'CHANGE-TODOLIST-TITLE': {
         return  state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
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

export const RemoveTodolistAC = (todoListId: string): RemoveTodolistType => {
    return {type: "REMOVE-TODOLIST", id: todoListId}
}

export const AddTodolistAC = (title: string): AddTodolistType => {
    return {type: "ADD-TODOLIST", title: title}
}

export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
}

export const ChangeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}