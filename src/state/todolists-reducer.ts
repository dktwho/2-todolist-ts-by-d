import {FilterValueType, TodoListType} from "../App";
import {v4} from "uuid";


export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListId: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListId: string
    filter: FilterValueType
}

type ActionsTypes = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

export let todoListId1 = v4()
export let todoListId2 = v4()

const initialState: TodoListType[] = []

export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionsTypes): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todoListId)
        }

        case 'ADD-TODOLIST': {
            return [{id: action.todoListId, title: action.title, filter: 'all'}, ...state,]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodolistType => {
    return {type: "REMOVE-TODOLIST", todoListId: todoListId}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: "ADD-TODOLIST", title: title, todoListId: v4()}
}

export const changeTodolistTitleAC = (title: string, todoListId: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListId: todoListId}
}

export const changeTodolistFilterAC = (filter: FilterValueType, todoListId: string): ChangeTodolistFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListId: todoListId}
}