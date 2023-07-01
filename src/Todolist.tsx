import React from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type  TitlePropsType = {
    title: string
    tasks: Array<TasksType>
    // tasks: TasksType[]
    removedTodo: (id: string) => void;
    filterTodos: (value: FilterValueType) => void
    addTodo: () => void

}

export const Todolist = ({title, tasks, removedTodo, filterTodos, addTodo}: TitlePropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button onClick={addTodo}>+</button>
            </div>
            <ul>
                {tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone} readOnly/>
                            <span>{el.title}</span>
                            <button onClick={() => removedTodo(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => filterTodos('all')}>All</button>
                <button onClick={() => filterTodos('active')}>Active</button>
                <button onClick={() => filterTodos('completed')}>Completed</button>
            </div>
        </div>
    )
}