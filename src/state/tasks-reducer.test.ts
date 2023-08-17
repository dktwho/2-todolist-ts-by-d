
import {v4} from 'uuid';
import { removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";

test('correct todolist should be removed', () => {


    const startState:  TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'Buy tonic', isDone: false},
            {id: '2', title: 'Buy bread', isDone: true},
            {id: '3', title: 'Watch movie', isDone: false}
        ]}

    const action = removeTaskAC('2', 'todoListId2')

    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todoListId1": [
            {id: "1", title: "HTML", isDone: false},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "JS", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "Buy tonic", isDone: false},
            {id: "3", title: "Watch movie", isDone: false}
        ]
    });
});