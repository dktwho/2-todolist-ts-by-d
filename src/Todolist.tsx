import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
    addTodo: (value: string) => void

}
export const Todolist = ({title, tasks, removedTodo, filterTodos, addTodo}: TitlePropsType) => {
    const [value, setValue] = useState('')

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTodo(value);
            setValue('')
        }
    }

    const onClickAddtask = () => {
        addTodo(value);
        setValue('')
    }

    const AllClickHandler = () => filterTodos('all')
    const ActiveClickHandler = () => filterTodos('active')
    const ComplitedClickHandler = () => filterTodos('completed')
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text" value={value} onChange={changeValue} onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickAddtask}>+
                </button>
            </div>
            <ul>
                {tasks.map(el => {
                    const onRemoveHandler = () => {
                        removedTodo(el.id)
                    }
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone} readOnly/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    )

                })}
            </ul>
            <div>
                <button onClick={AllClickHandler}>All</button>
                <button onClick={ActiveClickHandler}>Active</button>
                <button onClick={ComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}