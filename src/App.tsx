import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v4} from 'uuid';


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let tasks1 = [
        {id: v4(), title: 'HTML', isDone: true},
        {id: v4(), title: 'CSS', isDone: false},
        {id: v4(), title: 'JS', isDone: true},
    ]

    let [task, setTask] = useState<Array<TasksType>>(tasks1)
    let [filter, setFilter] = useState<FilterValueType>('all')


    const addTodo = (value: string) => {
        let newTask = {id: v4(), title: value, isDone: false}
        setTask([newTask, ...task])
    }

    const removedTodo = (id: string) => {
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
                addTodo={addTodo}
            />

        </div>
    );
}

export default App
