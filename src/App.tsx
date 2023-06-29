import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title={'Basic learn'}/>
            <Todolist title={'Advanced learn'}/>
        </div>
    );
}

export default App;
