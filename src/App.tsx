import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/ToDoList/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type toDoListsArrayType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {


    function removeTask(id: string, toDoListsID: string) {
        let filToDoListArray = tasksObj[toDoListsID]
        let filteredTasks = filToDoListArray.filter(t => t.id != id);
        tasksObj[toDoListsID] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, toDoListsID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let filToDoListArray = tasksObj[toDoListsID]
        let newTasks = [task, ...filToDoListArray];
        tasksObj[toDoListsID] = newTasks
        setTasks({...tasksObj})
    }


    const changeStatus = (taskId: string, isDone: boolean, toDoListsID: string) => {
        let filToDoListArray = tasksObj[toDoListsID]
        const taskStatus = filToDoListArray.find(t => t.id === taskId)
        if (taskStatus) {
            taskStatus.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const toDoListsID1 = v1()
    const toDoListsID2 = v1()

    const [toDoListsArray, setToDoListsArray] = useState<Array<toDoListsArrayType>>([
        {id: toDoListsID1, title: 'What to learn?', filter: 'all'},
        {id: toDoListsID2, title: 'What to buy?', filter: 'all'},
    ])

    const [tasksObj, setTasks] = useState({
        [toDoListsID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [toDoListsID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cola', isDone: true},
            {id: v1(), title: 'Fanta', isDone: false},
        ],
    });

    const removeToDoList = (toDoListsID: string) => {
        let toDoListRemove = toDoListsArray.filter(tl => tl.id !== toDoListsID)
        setToDoListsArray(toDoListRemove)
        delete tasksObj[toDoListsID]
        setTasks(tasksObj)
    }


    const toDoLists = toDoListsArray.map(tl => {
        let tasksForTodolist = tasksObj[tl.id];
        if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }

        function changeFilter(value: FilterValuesType) {
            tl.filter = value
            setToDoListsArray([...toDoListsArray])
        }


        return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={tl.filter}
            changeStatus={changeStatus}
            removeToDoList={removeToDoList}
        />
    })


    return (
        <div className="App">

            {toDoLists}
        </div>
    );
}

export default App;
