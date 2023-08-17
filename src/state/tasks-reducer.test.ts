import {v4} from 'uuid';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {addTodolistAC} from "./todolists-reducer";

test('correct task  should be removed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'Buy tonic', isDone: false},
            {id: '2', title: 'Buy bread', isDone: true},
            {id: '3', title: 'Watch movie', isDone: false}
        ]
    }

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
    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t => t.id !== '2')).toBeTruthy()
});


test('add new task for changed todolist', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'Buy tonic', isDone: false},
            {id: '2', title: 'Buy bread', isDone: true},
            {id: '3', title: 'Watch movie', isDone: false}
        ]
    }


    const action = addTaskAC('todoListId2', 'Learn JavaScript')

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe('Learn JavaScript');
    expect(endState["todoListId2"][0].isDone).toBeFalsy();
});

test('change status for task', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'Buy tonic', isDone: false},
            {id: '2', title: 'Buy bread', isDone: true},
            {id: '3', title: 'Watch movie', isDone: false}
        ]
    }


    const action = changeTaskStatusAC('todoListId2', '2', false)

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][1].isDone).toBe(false)
    expect(endState["todoListId1"][1].isDone).toBe(true)
});


test('change title for task', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'Buy tonic', isDone: false},
            {id: '2', title: 'Buy bread', isDone: true},
            {id: '3', title: 'Watch movie', isDone: false}
        ]
    }

    const action = changeTaskTitleAC('todoListId2', '2', 'new-title')

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][1].title).toBe('new-title');
    expect(endState["todoListId2"][1].isDone).toBe(true);
    expect(endState["todoListId1"][1].title).toBe('CSS');

});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'HTML', isDone: false},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'Buy tonic', isDone: false},
            {id: '2', title: 'Buy bread', isDone: true},
            {id: '3', title: 'Watch movie', isDone: false}
        ]
    }

    const action = addTodolistAC( 'some title')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find( k => k !== 'todoListId1' && k !== 'todoListId2')
    if(!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

});