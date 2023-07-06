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
    filter: FilterValueType
}
export const Todolist = ({title, tasks, removedTodo, filterTodos, addTodo, changeStatusHandler, filter}: TitlePropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === 'Enter') {
            addTodo(value);
            setValue('')
        }
    }
    const onClickAddTask = () => {
        if(value.trim() === '') {
            setError('Value is required')
            return
        }
        addTodo(value.trim());
        setValue('')
    }


    const AllClickHandler = () => filterTodos('all')
    const ActiveClickHandler = () => filterTodos('active')
    const CompletedClickHandler = () => filterTodos('completed')
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text" value={value} onChange={changeValue} onKeyPress={onKeyPressHandler} className={error ? 'error' : '' } />
                <button onClick={onClickAddTask}>+
                </button>
                { error && <div className='error-message'>{error}</div>}
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
                        <li key={el.id} className={el.isDone ? 'is-done': ''}>
                            <input onChange={onChangeHandler} type="checkbox" checked={el.isDone} readOnly/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    )

                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter': ''} onClick={AllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter': ''} onClick={ActiveClickHandler}>Active</button>
                <button className={filter === 'completed' ? 'active-filter': ''} onClick={CompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}