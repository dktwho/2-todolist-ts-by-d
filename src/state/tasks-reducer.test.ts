import {v4} from 'uuid';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";

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

    const value = 'Learn JavaScript'
    const action = addTaskAC('todoListId2', value)

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

    const title = 'new-title'


    const action = changeTaskTitleAC('todoListId2', '2', title)

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][1].title).toBe(title);
    expect(endState["todoListId2"][1].isDone).toBe(true);
    expect(endState["todoListId1"][1].title).toBe('CSS');

});