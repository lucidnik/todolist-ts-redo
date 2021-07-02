import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./todolist.module.css";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTaskTitle] = useState('');

    let [error, setError] = useState('');


    const onChangeCallBack = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setTaskTitle(e.currentTarget.value);
    };

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setError('');
            addItemCallback();
        }
    };

    const addItemCallback = () => {
         if (title.trim() === '') {
            setError('Title is required');
            return;
        }
        props.addItem(title);
        setTaskTitle('');
    };

    return (
        <div>
            <input type="text" onChange={onChangeCallBack} value={title} onKeyPress={onKeyPressCallback} className={error ? s.error : ''}/>
            <button onClick={addItemCallback}>+</button>
            <div className={error ? s.errorMessage : ''}>{error}</div>
        </div>
    );
};