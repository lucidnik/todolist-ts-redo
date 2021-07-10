import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditModeCallback = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewModeCallback = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const currentTitleCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
    ? <TextField onChange={currentTitleCallback} value={title} onBlur={activateViewModeCallback} autoFocus />
    : <span onDoubleClick={activateEditModeCallback} >{props.title}</span>
};