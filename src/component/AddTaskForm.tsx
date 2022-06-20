import React, {ChangeEvent, useState} from 'react';
import stl from "../TodoList.module.css";
import {Button, TextField} from "@material-ui/core";

type AddTaskFormType = {
    callBack: (title: string) => void
}

export const AddTaskForm = (props: AddTaskFormType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const OnKeyPressHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.callBack(title.trim());
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" size={"small"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={OnKeyPressHandler}
                       className={error ? "error" : ""}
            />
            <Button variant="contained" color="primary" onClick={addTask}
                    style={{width: '40px', height: '40px', minWidth: '40px'}}
            >+</Button>
            {error && <div className={stl.errorMessage}>{error}</div>}
        </div>
    );
};

