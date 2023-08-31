import React, {ChangeEvent, useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Task} from "./Task";


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
    removeTask: (taskId: string, todolistId: string) => void;
    filterTodos: (value: FilterValueType, todolistId: string) => void
    addItem: (value: string, todolistId: string) => void
    changeStatusHandler: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitleHandler: (taskId: string, newTitle: string, id: string) => void
    filter: FilterValueType
    removeTodoList: (todolistId: string) => void
    changeTodoListTitle: (todolistId: string, newTitle: string) => void
}
export const TodolistWithRedux = React.memo(({
                                                 title,
                                                 tasks,
                                                 removeTask,
                                                 filterTodos,
                                                 addItem,
                                                 changeStatusHandler,
                                                 filter,
                                                 id,
                                                 removeTodoList,
                                                 changeTitleHandler,
                                                 changeTodoListTitle
                                             }: TitlePropsType) => {

    console.log('TodolistWithRedux is called')

    const addTask = useCallback((title: string) => {
        addItem(title, id)
    }, [addItem, id])

    let taskForTodoList = tasks
    if (filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => !t.isDone)
    }

    const AllClickHandler = useCallback(() => filterTodos('all', id), [filterTodos, id])
    const ActiveClickHandler = useCallback(() => filterTodos('active', id), [filterTodos, id])
    const CompletedClickHandler = useCallback(() => filterTodos('completed', id), [filterTodos, id])

    const removeTodoListHandler = () => {
        removeTodoList(id)
    }

    const changeTodoListTitle2 = useCallback((newTitle: string) => {
        changeTodoListTitle(id, newTitle)
    }, [id, changeTodoListTitle])

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodoListTitle2}/>
                <IconButton onClick={removeTodoListHandler} size="large">
                    <Delete fontSize={"inherit"}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks.map(el => {
                    return (
                        <Task key={el.id} removeTask={removeTask} changeTitleHandler={changeTitleHandler}
                              changeStatusHandler={changeStatusHandler} el={el} todolistId={id}/>
                    )
                })}
            </ul>
            <div>
                <Button size="small" variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={AllClickHandler}>All</Button>
                <Button size="small" variant={filter === 'active' ? 'contained' : 'text'} onClick={ActiveClickHandler}>Active
                </Button>
                <Button size="small" variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={CompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

