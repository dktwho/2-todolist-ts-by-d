import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type  TitlePropsType = {
    title: string
    id: string
    tasks: Array<TasksType>
    // tasks: TasksType[]
    removedTodo: (id: string, todolistId: string) => void;
    filterTodos: (value: FilterValueType, todolistId: string) => void
    addTodo: (value: string, todolistId: string) => void
    changeStatusHandler: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodoList: (todolistId: string) => void
}
export const Todolist = ({title, tasks, removedTodo, filterTodos, addTodo, changeStatusHandler, filter, id, removeTodoList}: TitlePropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === 'Enter') {
            addTodo(value, id );
            setValue('')
            AllClickHandler()
        }
    }
    const onClickAddTask = () => {
        if(value.trim() === '') {
            setError('Value is required')
            return
        }
        addTodo(value.trim(), id);
        setValue('')
        AllClickHandler()
    }


    const AllClickHandler = () => filterTodos('all', id)
    const ActiveClickHandler = () => filterTodos('active', id)
    const CompletedClickHandler = () => filterTodos('completed', id)
    const removeTodoListHandler = () => {
        removeTodoList(id)
    }
    return (
        <div>
            <h3>{title} <button onClick={removeTodoListHandler}>x</button></h3>
            <div>
                <input type="text" value={value} onChange={changeValue} onKeyPress={onKeyPressHandler} className={error ? 'error' : '' } />
                <button onClick={onClickAddTask}>+
                </button>
                { error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasks.map(el => {
                    const onRemoveHandler = () => {
                        removedTodo(el.id, id)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatusHandler(el.id, e.currentTarget.checked, id)

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