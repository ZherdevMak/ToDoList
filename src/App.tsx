import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./component/AddItemForm";
import BasicAppBar from "./component/BasicAppBar";
import {Container, Grid, Paper} from "@material-ui/core";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    let TodoListTD1 = v1()
    let TodoListTD2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
            {id: TodoListTD1, title: 'What to learn', filter: 'all'},
            {id: TodoListTD2, title: 'What to learn', filter: 'active'}
        ]
    )

    let [tasks, setTasks] = useState<TasksType>({
        [TodoListTD1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "REACT/REDUX", isDone: false}],
        [TodoListTD2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "REACT/REDUX", isDone: false},
            {id: v1(), title: "REST API", isDone: false}]
    })
    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodoListsType = {id: newTodolistId, title: title, filter: 'all'};
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    let addTask = (TodoListID: string, e: string) => {
        let task: TaskType = {id: v1(), title: e, isDone: false}
        setTasks({...tasks, [TodoListID]: [task, ...tasks[TodoListID]]})
    }

    const removeTodoList = (TodoListID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== TodoListID))
        delete tasks[TodoListID]
    }
    const removeTask = (TodoListID: string, taskID: string) => {
        setTasks({...tasks, [TodoListID]: tasks[TodoListID].filter(t => t.id !== taskID)})
    }
    const changeTodoListFilter = (TodoListID: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === TodoListID ? {...el, filter: filter} : el))
    }
    const changeIsDone = (TodoListID: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [TodoListID]: tasks[TodoListID].map(e => e.id === id ? {...e, isDone: isDone} : e)})
    }

    const titleEdit = (ID: string, editedTitle: string) => {
        setTodoLists(todoLists.map(e => e.id === ID ? {...e, title: editedTitle} : e))
    }
    const editTask = (ID: string, taskID: string, editedTitle: string) => {
        setTasks({...tasks, [ID]: tasks[ID].map(el => el.id === taskID ? {...el, title: editedTitle} : el)})
    }

    return (
        <div>
            <BasicAppBar/>
            <div className="App">
                <Container fixed>
                    <Grid container style={{marginLeft: '30px'}} spacing={3}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container style={{padding: '20px'}} spacing={3}>
                        {todoLists.map((el) => {
                            let tasksForRender = tasks[el.id]
                            if (el.filter === 'active') {
                                tasksForRender = tasks[el.id].filter(t => t.isDone === false)
                            }
                            if (el.filter === 'completed') {
                                tasksForRender = tasks[el.id].filter(t => t.isDone === true)
                            }
                            return (<Grid item>
                                <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={el.id}
                                    TodoListID={el.id}
                                    title={el.title}
                                    tasks={tasksForRender}
                                    removeTask={removeTask}
                                    changeTodoListFilter={changeTodoListFilter}
                                    changeIsDone={changeIsDone}
                                    addTask={addTask}
                                    filter={el.filter}
                                    removeTodoList={removeTodoList}
                                    titleEdit={titleEdit}
                                    editTask={editTask}
                                />
                            </Paper>
                        </Grid>
                        )
                        })
                        }
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default App;
