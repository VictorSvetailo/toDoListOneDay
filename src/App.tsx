import React, {useState} from 'react';


import './App.css';
import {ArrayTasksType, ToDoList} from './component/ToDoLIst/ToDoList';
import {v1} from 'uuid';


export type FilterTasksValueType = 'all' | 'active' | 'completed'

type ToDoListArrayType = {
    id: string
    title: string
    filter: FilterTasksValueType
}

function App() {
    console.log('Render component App')
// data tasksObj

    const removeTask = (id: string, toDoListID: string) => {
        debugger
        let tasks = tasksObj[toDoListID];
        let removeFilterTask = tasks.filter(t => t.id !== id)
        tasksObj[toDoListID] = removeFilterTask
        setTasks({...tasksObj})
    }
    const addTask = (titleNewTask: string, toDoListID: string) => {
        let newAddTask = {id: v1(), title: titleNewTask, isDone: false}
        let tasks = tasksObj[toDoListID];
        let newAddTasks = [newAddTask, ...tasks];
        tasksObj[toDoListID] = newAddTasks
        setTasks({...tasksObj})
    }


    const changeTaskStatus = (taskID: string, isDone: boolean, toDoListID: string) => {
        let tasks = tasksObj[toDoListID];
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
        //setTasks([...tasksObj])
    }

// data ToDoList
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [toDoListsArray, setToDoListsArray] = useState<Array<ToDoListArrayType>>([
        {id: todolistId1, title: 'What to learn?', filter: 'completed'},
        {id: todolistId2, title: 'What to buy?', filter: 'all'},
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Just', isDone: false},
        ]
    })


    const filterTask = (value: FilterTasksValueType, toDoListID: string) => {
        let toDoList = toDoListsArray.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.filter = value
            setToDoListsArray([...toDoListsArray])
        }
    }
    const removeToDoList = (toDoListID: string) => {
        setToDoListsArray(toDoListsArray.filter(tdl => tdl.id !== toDoListID))
        delete tasksObj[toDoListID];
        setTasks({...tasksObj});
    }

    const toDoList = toDoListsArray.map(tl => {
        let filterForToDoLIst = tasksObj[tl.id]
        console.log(filterForToDoLIst)
        if (tl.filter === 'active') {
            filterForToDoLIst = filterForToDoLIst.filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            filterForToDoLIst = filterForToDoLIst.filter(t => t.isDone)
        }
        return <ToDoList
            key={tl.id}
            id={tl.id}
            titleToDoList={tl.title}
            tasks={filterForToDoLIst}
            removeTask={removeTask}
            filterTask={filterTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            removeToDoList={removeToDoList}
        />
    })

    return (
        <div className="App">
            {toDoList}
        </div>
    );
}

export default App;
