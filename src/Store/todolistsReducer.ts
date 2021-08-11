import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    todolistId: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValueType
}

export let todolistId_1 = v1();
export let todolistId_2 = v1();

const initialState: TodolistType[] = [
    {id: todolistId_1, title: "What to learn", filter: 'All'},
    {id: todolistId_2, title: "What to buy", filter: 'Active'}
];

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId);

        case 'ADD_TODOLIST':
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'All'
            }];

        case 'CHANGE_TODOLIST_TITLE':
            const todolist = state.find(todolist => todolist.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];

        case 'CHANGE_TODOLIST_FILTER':
            const newTodolistFilter = state.find(todolist => todolist.id === action.id);
            if (newTodolistFilter) {
                newTodolistFilter.filter = action.filter;
            }
            return [...state];

        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', todolistId};
};
export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', title, todolistId};
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', id, title};
};

export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE_TODOLIST_FILTER", id, filter};
};
