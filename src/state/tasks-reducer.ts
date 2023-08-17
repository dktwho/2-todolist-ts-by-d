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


type ActionsTypes = removeTaskActionType | addTaskActionType


export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }

        case 'ADD-TASK': {
            return {...state, [action.todolistId]: [{id: '4', title: 'Learn JavaScript', isDone: false }, ...state[action.todolistId]]}
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

