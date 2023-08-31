import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./TodolistWithRedux";


type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void;
    changeTitleHandler: (taskId: string, newTitle: string, id: string) => void
    changeStatusHandler: (taskId: string, isDone: boolean, todolistId: string) => void
    el: TasksType
    todolistId: string
}
export const Task = React.memo(({
                                    removeTask,
                                    changeTitleHandler,
                                    changeStatusHandler,
                                    el,
                                    todolistId
                                }: TaskPropsType) => {
    const onRemoveHandler = () => {
        removeTask(el.id, todolistId)
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatusHandler(el.id, e.currentTarget.checked, todolistId)
    }
    const onChangeTitle = (newValue: string) => {
        changeTitleHandler(el.id, newValue, todolistId)
    }
    return (
        <div key={el.id} className={el.isDone ? 'is-done' : ''}>
            <Checkbox size="small"
                      checked={el.isDone}
                      onChange={onChangeStatus}
            />

            <EditableSpan title={el.title} onChange={onChangeTitle}/>
            <IconButton onClick={onRemoveHandler} size="small">
                <Delete/>
            </IconButton>
        </div>
    )

})






