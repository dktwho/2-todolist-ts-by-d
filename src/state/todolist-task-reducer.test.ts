
import {TasksStateType, TodoListType} from "../App";
import {addTodolistAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: TodoListType[] = []

    const action = addTodolistAC('some title')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todoListsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)

} )