import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan is called')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    const activateSetEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField variant="filled" autoFocus onBlur={activateViewMode} onChange={onChangeTitleHandler}
                         value={title}></TextField>
            : <span onDoubleClick={activateSetEditMode}>{props.title}</span>

    )
})