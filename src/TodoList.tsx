import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import stl from './TodoList.module.css'
import CheckBox from "./component/CheckBox";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeIsDone: (id: string, isDone: boolean) => void
    addTask: (title: string) => void
    filter: FilterValuesType
}

const TodoList = (props: TodoListPropsType) => {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string|null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeIsDoneHandler = (Tid: string, isDone:boolean) => {
        props.changeIsDone(Tid,isDone)
    }
    const taskJsx = props.tasks.map(task => {

        return (
            <li key={task.id} className={task.isDone?stl.isDone:""}>
                <CheckBox isDone={task.isDone} callBack={(isDone)=>changeIsDoneHandler(task.id, isDone)}/>
                {/*<input type='checkbox' checked={task.isDone} onChange={(e) => changeIsDoneHandler(task.id, e)}/>*/}
                <span>{task.title}</span>
                <button onClick={() => {
                    props.removeTask(task.id)
                }}>X
                </button>
            </li>
        )
    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title} onChange={onChangeHandler} className={error ? stl.error : ''}/>
                    <button onClick={addTask}>+</button>
                    {error && <div className={stl.errorMessage}>{error}</div>}
                </div>
                <div>{taskJsx}</div>
                <div>
                    <button className={props.filter === 'all' ? stl.activeFilter: ''} onClick={() => {
                        props.changeTodoListFilter('all')
                    }}>All
                    </button>
                    <button className={props.filter === 'active' ? stl.activeFilter: ''} onClick={() => {
                        props.changeTodoListFilter('active')
                    }}>Active
                    </button>
                    <button className={props.filter === 'completed' ? stl.activeFilter: ''} onClick={() => {
                        props.changeTodoListFilter('completed')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;