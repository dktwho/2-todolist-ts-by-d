import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";


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
    changeTitleHandler: (taskId: string, newTitle: string, id: string) => void
    filter: FilterValueType
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (todolistId: string, newTitle: string) => void

}
export const Todolist = ({
                             title,
                             tasks,
                             removedTodo,
                             filterTodos,
                             addItem,
                             changeStatusHandler,
                             filter,
                             id,
                             removeTodoList,
                             changeTitleHandler,
                             changeTodoListTitle
                         }: TitlePropsType) => {

    const addTask = (title: string) => {
        addItem(title, id)
    }

    const AllClickHandler = () => filterTodos('all', id)
    const ActiveClickHandler = () => filterTodos('active', id)
    const CompletedClickHandler = () => filterTodos('completed', id)
    const removeTodoListHandler = () => {
        removeTodoList(id)
    }

    const changeTodoListTitle2 = (newTitle: string) => {
        changeTodoListTitle(id, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodoListTitle2}/>
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks.map(el => {
                    const onRemoveHandler = () => {
                        removedTodo(el.id, id)
                    }

                    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatusHandler(el.id, e.currentTarget.checked, id)
                    }

                    const onChangeTitle = (newValue: string) => {
                        changeTitleHandler(el.id, newValue, id)
                    }


                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input onChange={onChangeStatus} type="checkbox" checked={el.isDone} readOnly/>
                            {/*<span>{el.title}</span>*/}
                            <EditableSpan title={el.title} onChange={onChangeTitle}/>
                                <IconButton onClick={onRemoveHandler} >
                                    <Delete />
                                </IconButton>

                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={AllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={ActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={CompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

