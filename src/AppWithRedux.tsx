import React from 'react';
import './App.css';
import {TasksType} from "./Todolist";
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
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TodolistWithUseReducer} from "./TodolistWithUseReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string,
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>((state => state.todolists))
    const tasks = useSelector<AppRootStateType, TasksStateType>((state => state.tasks))


    const addItem = (value: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, value))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    const changeStatusHandler = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const changeTitleHandler = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    const filterTodos = (value: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(newTitle, id))
    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
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
                    {todolists.map(todolist => {

                        let taskForTodoList = tasks[todolist.id];

                        if (todolist.filter === 'completed') {
                            taskForTodoList = taskForTodoList.filter(t => t.isDone)
                        }
                        if (todolist.filter === 'active') {
                            taskForTodoList = taskForTodoList.filter(t => !t.isDone)
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

export default AppWithRedux
