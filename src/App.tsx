import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType}   from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {
    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id:v1(), title:'What to learn', filter: 'all'},
        {id:v1(), title:'What to learn', filter: 'active'}
        ]
    )

    let [tasks, setTasks] = useState<Array<TaskType>>(  [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "REACT/REDUX", isDone: false},

    ])
    // let [newTask, setTask] = useState<TaskType>({id: 1,
    //     title: '',
    //     isDone: true})
    let addTask = (e:string) => {
        let task: TaskType = {id: v1(), title: e, isDone: false}
        setTasks([task,...tasks])
    }



    const removeTask = (taskID:string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }
    const changeTodoListFilter = (TodoListID:string, filter:FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === TodoListID ? {...el, filter: filter} : el))
    }
    const changeIsDone = (id:string, isDone: boolean) => {
        setTasks(tasks.map(e => e.id===id ? {...e, isDone: isDone}: e))
    }

    return (
        <div className="App">
            {todoLists.map((el) => {
                let tasksForRender = tasks
                if (el.filter === 'active') {
                    tasksForRender = tasks.filter(t => t.isDone === false)
                }
                if (el.filter === 'completed') {
                    tasksForRender = tasks.filter(t => t.isDone === true)
                }
                return (
                    <TodoList
                        key = {el.id}
                        TodoListID = {el.id}
                        title={el.title}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        changeTodoListFilter = {changeTodoListFilter}
                        changeIsDone = {changeIsDone}
                        addTask = {addTask}
                        filter = {el.filter}
                    />
                )
            })
            }
            {/*<TodoList title={'gfgg'}*/}
            {/*            tasks={tasksForRender}*/}
            {/*            removeTask={removeTask}*/}
            {/*            changeTodoListFilter = {changeTodoListFilter}*/}
            {/*            changeIsDone = {changeIsDone}*/}
            {/*            addTask = {addTask}*/}
            {/*            filter = {filter}*/}
            {/*/>*/}
            {/*<TodoList title={'gfgg'}*/}
            {/*          tasks={tasksForRender}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeTodoListFilter = {changeTodoListFilter}*/}
            {/*          changeIsDone = {changeIsDone}*/}
            {/*          addTask = {addTask}*/}
            {/*          filter = {filter}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
