import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./AppWithReducer";
import s from './todolist.module.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    todolistId: string
    title: string
    tasks: TasksType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterValueType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    filter: FilterValueType

}


export const Todolist = (props: PropsType) => {

    const changeFilterAllCallback = () => {
        props.changeFilter('All', props.todolistId);
    };
    const changeFilterActiveCallback = () => {
        props.changeFilter('Active', props.todolistId);
    };
    const changeFilterCompletedCallback = () => {
        props.changeFilter('Completed', props.todolistId);
    };

    const removeTodolistCallback = () => {
        props.removeTodolist(props.todolistId);
    };

    const addTaskCallback = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.todolistId);
    };

    const changeTodolistTitleCallback = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId);
    };


    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodolistTitleCallback}/>
                <IconButton aria-label="delete" onClick={removeTodolistCallback}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback}/>
            <ul>
                {props.tasks?.map(task => {
                    const removeTaskCallback = () => {
                        props.removeTask(task.id, props.todolistId);
                    };

                    const changeCurrentStatusCallback = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(e.currentTarget.checked, task.id, props.todolistId);
                    };

                    const changeTaskTitleCallback = (title: string) => {
                        props.changeTaskTitle(title, task.id, props.todolistId);
                    };

                    return (
                        <div key={task.id} className={task.isDone ? s.isDone : ''}>
                            <Checkbox checked={task.isDone} onChange={changeCurrentStatusCallback}/>
                            <EditableSpan title={task.title} changeTitle={changeTaskTitleCallback}/>
                            <IconButton aria-label="delete" onClick={removeTaskCallback}>
                                <Delete/>
                            </IconButton>
                        </div>);
                })}

            </ul>
            <div>
                <Button variant={props.filter === 'All' ? 'contained' : 'text'} onClick={changeFilterAllCallback}>All</Button>
                <Button color={'primary'} variant={props.filter === 'Active' ? 'contained' : 'text'}
                        onClick={changeFilterActiveCallback}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'Completed' ? 'contained' : 'text'}
                        onClick={changeFilterCompletedCallback}>Completed</Button>
            </div>
        </div>
    );
};


