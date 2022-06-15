import React, {ChangeEvent, useState} from 'react';
import stl from "../TodoList.module.css";
type AddTaskFormType = {
    callBack:(title: string) => void
}

export const AddTaskForm = (props:AddTaskFormType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const OnKeyPressHandler = (event:React.KeyboardEvent<HTMLElement>) => {
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
            <input value={title}
                   onKeyPress={OnKeyPressHandler}
                   onChange={onChangeHandler}
                   className={error ? stl.error : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className={stl.errorMessage}>{error}</div>}
        </div>
    );
};

