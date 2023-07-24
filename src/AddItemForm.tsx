import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addTodo: (value: string, todolistId: string) => void
    id: string
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
        props.addTodo(value.trim(), props.id);
        setValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === 'Enter') {
            props.addTodo(value, props.id);
            setValue('')
        }
    }

    return (
        <div>
            <input type="text" value={value} onChange={changeValue} onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={onClickAddTask}>+
            </button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}