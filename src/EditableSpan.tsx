import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string

}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        editMode ? <input value={props.title}></input> : <span>{props.title}</span>
    )
}