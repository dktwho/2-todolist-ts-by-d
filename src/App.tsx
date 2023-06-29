import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let tasks1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: true},
    ]

    let [task, setTask] = useState(tasks1)

    let tasks2 = [
        {id: 1, title: 'React', isDone: true},
        {id: 2, title: 'Redux', isDone: false},
        {id: 3, title: 'WebPack', isDone: false},
        {id: 4, title: 'Redux Thunk/Saga', isDone: false},
    ]
    const removedTodo = (id: number) => {
        setTask(task.filter(el => el.id !== id))
    }


    return (
        <div className="App">
            <Todolist title={'Basic learn'} tasks={task} removedTodo={removedTodo}/>
            {/*<Todolist title={'Advanced learn'} tasks={tasks} removedTodo={removedTodo}/>*/}
        </div>
    );
}

export default App;
