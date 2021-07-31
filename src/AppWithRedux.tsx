import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./Store/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Store/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Store/Store";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TasksType[]
}


export const AppWithRedux = () => {

const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const changeTaskStatus = (isDone: boolean, taskId: string, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    };
    const addTask = (newTaskTitle: string, todolistId: string) => {
        dispatch(addTaskAC(newTaskTitle, todolistId));
    };
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    };

    const changeTaskTitle = (newTitle: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle));
    };

    const changeFilter = (filter: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    };


    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    };

    const addTodolist = (title: string) => {
        const todolistId = v1()
        dispatch(addTodolistAC(title, todolistId));
    };

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    };

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    < AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {

                            let tasksForTodolist = tasks[todolist.id];

                            if (todolist.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
                            } else if (todolist.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
                            }

                            return <Grid item>
                                <Paper style={{paddingBlock: "10px"}}>
                                    <Todolist
                                        key={todolist.id}
                                        todolistId={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        filter={todolist.filter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskStatus={changeTaskStatus}
                                    />
                                </Paper>
                            </Grid>;
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
};



