import {todolistsReducer} from "./todolists-reducer";
import {v4} from 'uuid';
import {TodoListType} from "../App";


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

    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title:newTodolist })
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist)
    expect(endState[0].filter).toBe('all')


})