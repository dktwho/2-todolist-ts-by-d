import React from 'react'
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task Component',
    component: Task
}

// const callback = action('Button add was pressed inside the from ')

const changeStatusHandlerCallback = action('Status changed')
const changeTitleHandlerCallback = action('Title changed')
const removeTaskHandlerCallback = action('Task removed')

export const TaskBaseExample = () => {
    return (
        <>
            <Task
                removeTask={removeTaskHandlerCallback}
                changeTitleHandler={changeTitleHandlerCallback}
                changeStatusHandler={changeStatusHandlerCallback}
                el={{id: '1', isDone: true, title: 'Css'}}
                todolistId={'todolistId1'}/>

            <Task
                removeTask={removeTaskHandlerCallback}
                changeTitleHandler={changeTitleHandlerCallback}
                changeStatusHandler={changeStatusHandlerCallback}
                el={{id: '1', isDone: false, title: 'JS'}}
                todolistId={'todolistId12'}/>
        </>
    )
}