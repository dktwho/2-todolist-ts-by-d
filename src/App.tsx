import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let tasks1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: true},
    ]

    let tasks2 = [
        {id: 1, title: 'React', isDone: true},
        {id: 2, title: 'Redux', isDone: false},
        {id: 3, title: 'WebPack', isDone: false},
        {id: 4, title: 'Redux Thunk/Saga', isDone: false},
    ]
    return (
        <div className="App">
            <Todolist title={'Basic learn'} tasks={tasks1}/>
            <Todolist title={'Advanced learn'} tasks={tasks2}/>
        </div>
    );
}

export default App;
