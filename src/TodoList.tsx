import React from 'react';
import {FilterValuesType} from "./App";
import stl from './TodoList.module.css'
import CheckBox from "./component/CheckBox";
import {AddTaskForm} from "./component/AddTaskForm";
import {EditableSpan} from "./component/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodoListPropsType = {

    title: string,
    tasks: Array<TaskType>
    removeTask: (TodoListTD: string, taskID: string) => void
    changeTodoListFilter: (TodoListID: string, filter: FilterValuesType) => void
    changeIsDone: (TodoListID: string, Tid: string, isDone: boolean) => void
    addTask: (TodoListID: string, title: string) => void
    filter: any
    TodoListID: string
    removeTodoList: (TodoListID: string) => void
    titleEdit: (ID: string, editedTitle: string) => void
    editTask: (ID: string, taskID: string, editedTitle: string) => void
}

const TodoList = (props: TodoListPropsType) => {


    const changeIsDoneHandler = (Tid: string, isDone: boolean) => {
        props.changeIsDone(props.TodoListID, Tid, isDone)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(props.TodoListID, title)
    }
    const taskJsx = props.tasks.map(task => {

        return (
            <li key={task.id} className={task.isDone ? stl.isDone : ""}>
                <CheckBox isDone={task.isDone} callBack={(isDone) => changeIsDoneHandler(task.id, isDone)}/>
                <EditableSpan title={task.title} callBack={(title: string) => editTaskHandler(task.id, title)}/>
                <IconButton aria-label="delete" onClick={() => {
                    props.removeTask(props.TodoListID, task.id)
                }}><Delete/>
                </IconButton>
            </li>
        )
    })
    const removeTodoList = () => {
        props.removeTodoList(props.TodoListID)
    }
    const titleEditHandler = (editedTitle: string) => {
        props.titleEdit(props.TodoListID, editedTitle)
    }
    const editTaskHandler = (taskID: string, editedTitle: string) => {
        props.editTask(props.TodoListID, taskID, editedTitle)
    }

    return (
        <div>
            <div>
                <EditableSpan callBack={titleEditHandler} title={props.title}/>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
                <AddTaskForm callBack={addTaskHandler}/>

                <div>{taskJsx}</div>
                <div>
                    <Button color={props.filter === 'all' ? "secondary" : "primary"}
                            onClick={() => {
                                props.changeTodoListFilter(props.TodoListID, 'all')
                            }}>All</Button>
                    <Button color={props.filter === 'active' ? "secondary" : "primary"}
                            onClick={() => {
                                props.changeTodoListFilter(props.TodoListID, 'active')
                            }}>Active</Button>
                    <Button color={props.filter === 'completed' ? "secondary" : "primary"}
                            onClick={() => {
                                props.changeTodoListFilter(props.TodoListID, 'completed')
                            }}>Completed</Button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;