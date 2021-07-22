import {v1} from 'uuid';
import {FilterValueType, TodolistType} from '../App';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolistsReducer';

test('correct todolist should be removed', () => {
    let todolistId_1 = v1();
    let todolistId_2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId_1, title: "What to learn", filter: "All"},
        {id: todolistId_2, title: "What to buy", filter: "All"}
    ];

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId_1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId_2);
});

test('correct todolist should be added', () => {
    let todolistId_1 = v1();
    let todolistId_2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId_1, title: "What to learn", filter: "All"},
        {id: todolistId_2, title: "What to buy", filter: "All"}
    ];

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('All');
});

test('correct todolist should change its name', () => {
    let todolistId_1 = v1();
    let todolistId_2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: TodolistType[] = [
        {id: todolistId_1, title: "What to learn", filter: "All"},
        {id: todolistId_2, title: "What to buy", filter: "All"}
    ];

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId_2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId_1 = v1();
    let todolistId_2 = v1();

    let newFilter: FilterValueType = "Completed";

    const startState: Array<TodolistType> = [
        {id: todolistId_1, title: "What to learn", filter: "All"},
        {id: todolistId_2, title: "What to buy", filter: "All"}
    ];

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId_2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});


