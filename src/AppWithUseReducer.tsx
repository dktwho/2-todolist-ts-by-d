import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v4} from 'uuid';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Menu} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import {AddItemForm} from "./AddItemForm";
import {changeTodolistFilterAC, removeTodolistAC, todoListsReducer} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TodolistWithUseReducer} from "./TodolistWithUseReducer";

//

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string,
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithUseReducer() {

    let todoListId1 = v4()
    let todoListId2 = v4()

    let [todoLists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v4(), title: 'HTML', isDone: true},
            {id: v4(), title: 'CSS', isDone: false},
            {id: v4(), title: 'JS', isDone: true}
        ],
        [todoListId2]: [
            {id: v4(), title: 'Buy tonic', isDone: true},
            {id: v4(), title: 'Buy bread', isDone: false},
            {id: v4(), title: 'Watch movie', isDone: false}
        ]
    })

    const addItem = (value: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(todolistId, value))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(taskId, todolistId))
    }

    const changeStatusHandler = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(todolistId,taskId, isDone))
    }

    const changeTitleHandler = (taskId: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    const filterTodos = (value: FilterValueType, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(value, todolistId))
    }

    const removeTodoList = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
    }


    const changeTodoListTitle = (id: string, newTitle: string) => {
        // const todolist = todoLists.find(tl => tl.id === id)
        // if (todolist) {
        //     todolist.title = newTitle
        //     setTodoLists([...todoLists])
        // }
    }

    const addTodoList = (title: string) => {
        // let todolist: TodoListType = {id: v4(), filter: 'all', title: title}
        // setTodoLists([todolist, ...todoLists])
        // setTasks({...tasksObj, [todolist.id]: []})
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={4}>
                    {todoLists.map(todolist => {

                        let taskForTodoList = tasksObj[todolist.id];

                        if (todolist.filter === 'completed') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
                        }
                        if (todolist.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
                        }

                        return (
                            <Grid key={todolist.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodolistWithUseReducer
                                        key={todolist.id}
                                        title={todolist.title}
                                        id={todolist.id}
                                        tasks={taskForTodoList}
                                        removeTask={removeTask}
                                        filterTodos={filterTodos}
                                        addItem={addItem}
                                        changeStatusHandler={changeStatusHandler}
                                        filter={todolist.filter}
                                        removeTodoList={removeTodoList}
                                        changeTitleHandler={changeTitleHandler}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithUseReducer
