import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValue, TaskType} from "./App";
import s from './todolist.module.css';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValue) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void
    filter: FilterValue

}


export const Todolist = (props: PropsType) => {

    let [newTaskTitle, setTaskTitle] = useState('');

    let [error, setError] = useState('');

    const changeFilterAllCallback = () => {
        props.changeFilter('All');
    };
    const changeFilterActiveCallback = () => {
        props.changeFilter('Active');
    };
    const changeFilterCompletedCallback = () => {
        props.changeFilter('Completed');
    };

    const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setTaskTitle(e.currentTarget.value);
    };

    const addTaskCallback = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required');
            return;
        }
        props.addTask(newTaskTitle);
        setTaskTitle('');
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setError('');
            addTaskCallback();
        }
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" onChange={onChangeCallBack} value={newTaskTitle} onKeyPress={onKeyPressCallback} className={error ? s.error : ''}/>
                <button onClick={addTaskCallback}>+</button>
                <div className={error ? s.errorMessage : ''}>{error}</div>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const removeTaskCallback = () => {
                        props.removeTask(task.id);
                    };

                    const changeCurrentStatusCallback = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(e.currentTarget.checked, task.id);
                    };

                    return (
                        <li key={task.id} className={task.isDone ? s.isDone : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeCurrentStatusCallback}/>
                            <span>{task.title}</span>
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

