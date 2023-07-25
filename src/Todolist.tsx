import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    addItem: (value: string, todolistId: string) => void
    changeStatusHandler: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodoList: (todolistId: string) => void
}
export const Todolist = ({title, tasks, removedTodo, filterTodos, addItem, changeStatusHandler, filter, id, removeTodoList}: TitlePropsType) => {

    const addTask = (title: string) => {
        addItem(title, id)
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
            <AddItemForm addItem={addTask}/>
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
                            {/*<span>{el.title}</span>*/}
                            <EditableSpan title={el.title} />
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

