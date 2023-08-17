import {v4} from "uuid";
import {TasksStateType} from "../App";


export type removeTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}

export type addTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    value: string
}

export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}


type ActionsTypes = removeTaskActionType | addTaskActionType | changeTaskStatusActionType


export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }

        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: '4', title: 'Learn JavaScript', isDone: false}, ...state[action.todolistId]]
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

        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todolistId}
}

export const addTaskAC = (todolistId: string, value: string): addTaskActionType => {
    return {type: "ADD-TASK", todolistId, value}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, isDone}
}


