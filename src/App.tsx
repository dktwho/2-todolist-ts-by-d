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

    let [tasks, setTasks] = useState<Array<TasksType>>(tasks1)
    let [filter, setFilter] = useState<FilterValueType>('all')

    const addTodo = (value: string) => {
        let newTask = {id: v4(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removedTodo = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    let taskForTodoList = tasks;
    const filterTodos = (value: FilterValueType) => {
        setFilter(value)
    }

    if (filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }

    const changeStatusHandler = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title={'Basic learn'}
                tasks={taskForTodoList}
                removedTodo={removedTodo}
                filterTodos={filterTodos}
                addTodo={addTodo}
                changeStatusHandler={changeStatusHandler}
            />
        </div>
    );
}

export default App
