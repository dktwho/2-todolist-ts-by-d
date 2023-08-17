import {v4} from "uuid";
import {TasksStateType} from "../App";


export type removeTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}

export type SType = {
    type: '2'
}


type ActionsTypes = removeTaskActionType | SType


export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }

        case '2': {
            return state
        }

        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: "REMOVE_TASK", taskId, todolistId}
}

export const addTaskAC = (): SType => {
    return {type: "2"}
}

