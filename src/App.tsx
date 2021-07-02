import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [key:string]: TaskType[]
}


const App = () => {

    const changeTaskStatus = (isDone: boolean, taskId: string, todolistId: string) => {

        let tasks = tasksObj[todolistId];

        let currentTask = tasks.find(task => task.id === taskId);
        if (currentTask) {
            currentTask.isDone = isDone;

            setTasksObj({...tasksObj});
        }
    };
    const addTask = (newTaskTitle: string, todolistId: string) => {
        let newTask = {id: v1(), title: newTaskTitle.trim(), isDone: false};
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = [newTask, ...tasks];

        setTasksObj({...tasksObj});

    };
    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = tasks.filter(task => task.id !== id);
        setTasksObj({...tasksObj});
    };

    const changeFilter = (filter: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(todolist => todolist.id === todolistId);
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists]);
        }
    };

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(todolist => todolist.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    };

    let todolistId_1 = v1();
    let todolistId_2 = v1();


    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: 'All'},
        {id: todolistId_2, title: "What to buy", filter: 'Active'}
    ]);

    let [tasksObj, setTasksObj] = useState<TasksStateType>({

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

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(), filter: 'All', title: title
        };
        setTodolists([todolist, ...todolists]);
        setTasksObj({...tasksObj, [todolist.id]: []})
    };

    const changeTaskTitle = (newTitle:string, taskId:string, todolistId: string ) => {
        let tasks = tasksObj[todolistId];

        let currentTask = tasks.find(task => task.id === taskId);
        if (currentTask) {
            currentTask.title = newTitle

            setTasksObj({...tasksObj});
        }

    }

    const changeTodolistTitle = (newTitle:string, todolistId: string) => {
        const todolist = todolists.find((todolist => todolist.id === todolistId))

        if(todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolist}/>

            {
                todolists.map(todolist => {

                    let tasksForTodolist = tasksObj[todolist.id];

                    if (todolist.filter === 'Active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
                    } else if (todolist.filter === 'Completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
                    }

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
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
                    />;
                })
            }

        </div>
    );
};

export default App;


