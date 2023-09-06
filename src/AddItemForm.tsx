import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (value: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickAddTask = () => {
        if (value.trim() === '') {
            setError('Value is required')
            return
        }
        props.addItem(value.trim());
        setValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)
        if (e.code === 'Enter') onClickAddTask()
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                title={'type here'}
                label={'type value'}
                type="text"
                value={value}
                onChange={changeValue}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={onClickAddTask}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})