import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

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
            <TextField variant={"outlined"}
                       label={'Type Value'}
                       type="text"
                       onChange={onChangeCallBack}
                       value={title}
                       onKeyPress={onKeyPressCallback}
                       error={!!error}
                       helperText={error}             />

            <IconButton onClick={addItemCallback} color={'primary'} >
                <ControlPoint />
            </IconButton>
        </div>
    );
};