import {FilterValueType, TodoListType} from "../App";
import {v4} from "uuid";


type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleType = {
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


export const todoListsReducer = (state: TodoListType[], action: ActionsTypes): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todoListId)
        }

        case 'ADD-TODOLIST': {
            return [{id: v4(), title: action.title, filter: 'all'}, ...state,]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        }

        default:
            throw new Error('bad action type')
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodolistType => {
    return {type: "REMOVE-TODOLIST", todoListId: todoListId}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: "ADD-TODOLIST", title: title}
}

export const changeTodolistTitleAC = (title: string, todoListId: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListId: todoListId}
}

export const changeTodolistFilterAC = (filter: FilterValueType, todoListId: string): ChangeTodolistFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListId: todoListId}
}