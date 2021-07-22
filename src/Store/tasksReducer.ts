import {TasksStateType,} from "../App";
import {v1} from "uuid";

type ActionTypes = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType


type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD_TASK'
    taskTitle: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistId: string
    taskId: string
    newTitle: string
}

export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            };
        case "ADD_TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.taskTitle, isDone: false}, ...state[action.todolistId]]
            };
        case "CHANGE_TASK_STATUS": {
            const stateCopy = {...state};
            const todolist = stateCopy[action.todolistId];
            const changeStatus = todolist.find(task => task.id === action.taskId);
            if (changeStatus) {
                changeStatus.isDone = action.isDone;
            }
            return stateCopy;
        }
        case "CHANGE_TASK_TITLE":
            const stateCopy = {...state};
            const todolist = stateCopy[action.todolistId];
            const changeTitle = todolist.find(task => task.id === action.taskId);
            if (changeTitle) {
                changeTitle.title = action.newTitle;
            }
            return stateCopy;
        default:
            return {...state};
    }
};

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', todolistId, taskId};
};

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', taskTitle, todolistId};
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId
    };
};

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE', todolistId, taskId, newTitle
    };
};