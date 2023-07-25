import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    const activateSetEditMode = () => setEditMode(true)
    const activateViewMode = () => setEditMode(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        editMode ? <input autoFocus onBlur={activateViewMode} value={props.title}></input> : <span onDoubleClick={activateSetEditMode}>{props.title}</span>
    )
}