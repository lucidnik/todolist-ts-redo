import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from "./Store/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Store/tasksReducer";

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


export const AppWithReducer = () => {

    let todolistId_1 = v1();
    let todolistId_2 = v1();


    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: "What to learn", filter: 'All'},
        {id: todolistId_2, title: "What to buy", filter: 'Active'}
    ]);

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {

        [todolistId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React.js', isDone: false}
        ],

        [todolistId_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Water', isDone: false},
        ]
    });

    const changeTaskStatus = (isDone: boolean, taskId: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId));
    };
    const addTask = (newTaskTitle: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(newTaskTitle, todolistId));
    };
    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasksReducer(removeTaskAC(todolistId, taskId));
    };

    const changeTaskTitle = (newTitle: string, taskId: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, newTitle));
    };

    const changeFilter = (filter: FilterValueType, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, filter));
    };


    let removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId));
        dispatchToTasksReducer(removeTodolistAC(todolistId));
    };

    const addTodolist = (title: string) => {
        const todolistId = v1()
        dispatchToTodolistsReducer(addTodolistAC(title, todolistId));
        dispatchToTasksReducer(addTodolistAC(title, todolistId));
    };

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle));
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

                            let tasksForTodolist = tasksObj[todolist.id];

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



