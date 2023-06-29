import React from "react";

export type  TitlePropsType = {
    title: string
}

export const Todolist = ({title}:TitlePropsType ) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/><span>HTML</span></li>
                <li><input type="checkbox" checked={true}/><span>CSS</span></li>
                <li><input type="checkbox" checked={true}/><span>JS</span></li>

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}