import {userReducer} from "./userReducer";

test('user reducer should increment only age by 1', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT_AGE'});

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount by 1', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT'});

    expect(endState.childrenCount).toBe(3);
    expect(endState.age).toBe(20);

});

test('user reducer should change name of user', () => {
    const startState = { name: 'Dimych', age: 20, childrenCount: 2 };
    const newName = 'Viktor';
    const endState = userReducer(startState, { type: 'CHANGE_NAME', newName: newName })

    expect(endState.name).toBe(newName);
});

