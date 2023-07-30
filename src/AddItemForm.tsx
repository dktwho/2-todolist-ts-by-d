import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (value: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
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
        setError(null)
        if (e.code === 'Enter') {
            props.addItem(value);
            setValue('')
        }
    }

    return (
        <div>
            <input type="text" value={value} onChange={changeValue} onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <Button variant={'outlined'} color={'success'} onClick={onClickAddTask}>+</Button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}