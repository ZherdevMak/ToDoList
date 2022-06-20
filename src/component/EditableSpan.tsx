import React, {useState} from 'react';
import {TextField} from "@material-ui/core";
import classes from "*.module.sass";

type EditableSpanType = {
    title: string
    callBack: (editedTitle: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {
    let [edit, setEdit] = useState<boolean>(false)
    let [editedTitle, setEditedTitle] = useState<string>(props.title)
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedTitle(e.currentTarget.value)
    }
    const spanHandler = () => {
        setEdit(!edit)
        addTask()

    }

    const OnKeyPressHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") {
            setEdit(!edit)
            addTask()
        }
    }
    const addTask = () => {
        if (editedTitle.trim() !== "") {
            props.callBack(editedTitle.trim());
        } else {
            setError('Title is required')
        }
    }

    return (
        edit
            ? <TextField id="outlined-basic" label="Outlined" variant="outlined"
                         type={"text"} autoFocus onBlur={spanHandler} onKeyPress={OnKeyPressHandler} onChange={(e)=>{onChangeHandler(e)}} value={editedTitle}/>
            : <span onDoubleClick={spanHandler}>{props.title}</span>

    );
};

