import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValue = 'All' | 'Active' | 'Completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const App = () => {

    const title = 'What to learn';

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React.js', isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValue>('All');

    const changeTaskStatus = (isDone: boolean, taskId: string) => {
        let currentTask = tasks.find(task => task.id === taskId);
        if (currentTask) {
            currentTask.isDone = isDone;
            setTasks([...tasks]);
        }
    };

    const addTask = (newTaskTitle: string) => {
        let newTask = {id: v1(), title: newTaskTitle.trim(), isDone: false};
        let newTasksArray = [newTask, ...tasks];
        setTasks(newTasksArray);
    };

    const removeTask = (id: string) => {
        const currentTasks = tasks.filter(task => task.id !== id);
        setTasks(currentTasks);
    };

    const changeFilter = (filter: FilterValue) => {
        setFilter(filter);
    };

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone);
    } else if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone);
    }

    return (
        <div className="App">
            <Todolist title={title} tasks={filteredTasks} changeTaskStatus={changeTaskStatus} addTask={addTask} removeTask={removeTask}
                      changeFilter={changeFilter} filter={filter} />
        </div>
    );
};

export default App;


