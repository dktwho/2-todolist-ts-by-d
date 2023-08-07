import {ChangeTodolistFilterType, todolistsReducer} from "./todolists-reducer";
import {v4} from 'uuid';
import {FilterValueType, TodoListType} from "../App";


test('correct todolist should be removed', () => {
    let todoListId1 = v4()
    let todoListId2 = v4()

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListId1})
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)

})


test('add new todolist', () => {
    let todoListId1 = v4()
    let todoListId2 = v4()
    let newTodolist = 'New Todolist'

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolist})
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist)
    expect(endState[0].filter).toBe('all')
})


test('correct todolist should change his name', () => {
    let todoListId1 = v4()
    let todoListId2 = v4()

    let newTodolistTitle = 'Some NEW Todolist'


    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todoListId2,
        title: newTodolistTitle
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[0].title).toBe('What to learn')

})


test('correct filter of todolist should be changed', () => {
    let todoListId1 = v4()
    let todoListId2 = v4()

    let newFilter :  FilterValueType = 'completed'


    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const action: ChangeTodolistFilterType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todoListId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].filter).toBe('all')

})