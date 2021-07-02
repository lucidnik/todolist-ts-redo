import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
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
        props.onChange(title)
    }

    const currentTitleCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
    ? <input onChange={currentTitleCallback} value={title} onBlur={activateViewModeCallback} autoFocus />
    : <span onDoubleClick={activateEditModeCallback} >{props.title}</span>
};