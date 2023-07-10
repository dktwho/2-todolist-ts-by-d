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


    // let [tasks, setTasks] = useState<Array<TasksType>>(tasks1)

    const addTodo = (value: string, todolistId: string) => {
        let task = {id: v4(), title: value, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    const removedTodo = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(el => el.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    const changeStatusHandler = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})
    }

    const filterTodos = (value: FilterValueType, todolistId: string) => {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v4()
    let todoListId2 = v4()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'},
    ])

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [
            {id: v4(), title: 'HTML', isDone: true},
            {id: v4(), title: 'CSS', isDone: false},
            {id: v4(), title: 'JS', isDone: true}
        ],
        [todoListId2]: [
            {id: v4(), title: 'Buy tonic', isDone: true},
            {id: v4(), title: 'Buy bread', isDone: false},
            {id: v4(), title: 'Watch movie', isDone: false}
        ]
    })


    return (
        <div className="App">
            {todoLists.map(todolist => {

                let taskForTodoList = tasksObj[todolist.id];

                if (todolist.filter === 'completed') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
                }
                if (todolist.filter === 'active') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
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
