import React from "react";


export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}
export type  TitlePropsType = {
    title: string
    tasks: Array<TasksType>
    // tasks: TasksType[]
}

export const Todolist = ({title, tasks}: TitlePropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(el => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/><span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}