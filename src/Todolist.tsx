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
    changeStatusHandler: (taskId: string, isDone: boolean) => void
}
export const Todolist = ({title, tasks, removedTodo, filterTodos, addTodo, changeStatusHandler}: TitlePropsType) => {
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
        if(value.trim() === '') {
            return
        }
        addTodo(value);
        setValue('')
    }


    const AllClickHandler = () => filterTodos('all')
    const ActiveClickHandler = () => filterTodos('active')
    const CompletedClickHandler = () => filterTodos('completed')
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

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatusHandler(el.id, e.currentTarget.checked)

                    }

                    return (
                        <li key={el.id}>
                            <input onChange={onChangeHandler} type="checkbox" checked={el.isDone} readOnly/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    )

                })}
            </ul>
            <div>
                <button onClick={AllClickHandler}>All</button>
                <button onClick={ActiveClickHandler}>Active</button>
                <button onClick={CompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}