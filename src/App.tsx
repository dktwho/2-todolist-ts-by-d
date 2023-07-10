import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v4} from 'uuid';


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string,
    title: string
    filter: FilterValueType
}


function App() {

    let tasks1 = [
        {id: v4(), title: 'HTML', isDone: true},
        {id: v4(), title: 'CSS', isDone: false},
        {id: v4(), title: 'JS', isDone: true},
    ]

    let [tasks, setTasks] = useState<Array<TasksType>>(tasks1)

    const addTodo = (value: string) => {
        let newTask = {id: v4(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removedTodo = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    const changeStatusHandler = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    const filterTodos = (value: FilterValueType, todolistId: string) => {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if(todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: v4(), title: 'What to learn', filter: 'active'},
        {id: v4(), title: 'What to buy', filter: 'completed'},
    ])

    return (
        <div className="App">
            {todoLists.map(todolist => {

                let taskForTodoList = tasks;

                if (todolist.filter === 'completed') {
                    taskForTodoList = tasks.filter(t => t.isDone === true)
                }
                if (todolist.filter === 'active') {
                    taskForTodoList = tasks.filter(t => t.isDone === false)
                }

                return (
                    <Todolist
                        key={todolist.id}
                        title={todolist.title}
                        id={todolist.id}
                        tasks={taskForTodoList}
                        removedTodo={removedTodo}
                        filterTodos={filterTodos}
                        addTodo={addTodo}
                        changeStatusHandler={changeStatusHandler}
                        filter={todolist.filter}
                    />
                )
            })}
        </div>
    );
}

export default App
