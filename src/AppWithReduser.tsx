import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";
import {RemoveTodolistAC} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReduser() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTotodolists] = useReducer(todolistsReducer,
        [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ])

    let [tasks, dispatchToTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let action = removeTaskAC(id, todolistId)

        dispatchToTasks(action);
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))

    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
    }


    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(todolistId: string,filter: FilterValuesType) {
        dispatchTotodolists(ChangeTodolistFilterAC(todolistId,filter))
    }

    function removeTodolist(todolistId: string) {
        dispatchTotodolists(RemoveTodolistAC(todolistId))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchTotodolists(ChangeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatchTotodolists(action)
        dispatchToTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <div key={v1()}>
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            </div>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReduser;
