import {v4} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistType, RemoveTodolistType, todoListId1, todoListId2} from "./todolists-reducer";


export type removeTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}

export type addTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}

export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TITLE-STATUS'
    todolistId: string
    taskId: string
    title: string
}


type ActionsTypes =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistType
    | RemoveTodolistType

const initialState:TasksStateType  = {
    [todoListId1]: [
        {id: v4(), title: 'HTML', isDone: true},
        {id: v4(), title: 'CSS', isDone: false},
        {id: v4(), title: 'JS', isDone: true}
    ],
    [todoListId2]: [
        {id: v4(), title: 'Buy tonic', isDone: true},
        {id: v4(), title: 'Buy bread', isDone: false},
        {id: v4(), title: 'Watch movie', isDone: false}
    ]
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }

        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v4(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }

        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }

        case 'CHANGE-TITLE-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }

        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todolistId}
}

export const addTaskAC = (todolistId: string, title: string): addTaskActionType => {
    return {type: "ADD-TASK", todolistId, title}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, isDone}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE-STATUS", todolistId, taskId, title}
}

