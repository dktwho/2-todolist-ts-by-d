import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let tasks1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: true},
    ]

    let [task, setTask] = useState<Array<TasksType>>(tasks1)
    let [filter, setFilter] = useState<FilterValueType>('all')

    // let tasks2 = [
    //     {id: 1, title: 'React', isDone: true},
    //     {id: 2, title: 'Redux', isDone: false},
    //     {id: 3, title: 'WebPack', isDone: false},
    //     {id: 4, title: 'Redux Thunk/Saga', isDone: false},
    // ]
    const removedTodo = (id: number) => {
        setTask(task.filter(el => el.id !== id))
    }
    let taskForTodoList = task;
    const filterTodos = (value: FilterValueType) => {
        setFilter(value)
    }

    if (filter === 'completed') {
        taskForTodoList = task.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        taskForTodoList = task.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title={'Basic learn'}
                tasks={taskForTodoList}
                removedTodo={removedTodo}
                filterTodos={filterTodos}

            />
            {/*<Todolist title={'Advanced learn'} tasks={tasks} removedTodo={removedTodo}/>*/}
        </div>
    );
}

export default App
