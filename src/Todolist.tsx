import React, {ChangeEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import s from './todolist.module.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterValueType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (newTitle:string, taskId:string, todolistId: string) => void
    changeTodolistTitle: (newTitle:string, todolistId: string) => void
    filter: FilterValueType

}


export const Todolist = (props: PropsType) => {

    const changeFilterAllCallback = () => {
        props.changeFilter('All', props.id);
    };
    const changeFilterActiveCallback = () => {
        props.changeFilter('Active', props.id);
    };
    const changeFilterCompletedCallback = () => {
        props.changeFilter('Completed', props.id);
    };

    const removeTodolistCallback = () => {
        props.removeTodolist(props.id);
    };

    const changeTaskTitle = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id);
    };

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id);
    };





    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolistCallback}>X</button>
            </h3>
            <AddItemForm addItem={changeTaskTitle}/>
            <ul>
                {props.tasks.map(task => {
                    const removeTaskCallback = () => {
                        props.removeTask(task.id, props.id);
                    };

                    const changeCurrentStatusCallback = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(e.currentTarget.checked, task.id, props.id);
                    };

                    const changeTitleCallback = (title: string) => {
                        props.changeTaskTitle(title, task.id, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? s.isDone : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeCurrentStatusCallback}/>
                            <EditableSpan title={task.title} onChange={changeTitleCallback} />
                            <button onClick={removeTaskCallback}>X</button>
                        </li>);
                })}

            </ul>
            <div>
                <button className={props.filter === 'All' ? s.activeFilter : ''} onClick={changeFilterAllCallback}>All</button>
                <button className={props.filter === 'Active' ? s.activeFilter : ''} onClick={changeFilterActiveCallback}>Active</button>
                <button className={props.filter === 'Completed' ? s.activeFilter : ''} onClick={changeFilterCompletedCallback}>Completed</button>
            </div>
        </div>
    );
};


