import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/ToDoList/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type ToDoListArrayType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    function removeTask(id: string, toDoListID: string) {
        let filtered = tasksObj[toDoListID]
        let filteredTasks = filtered.filter(t => t.id != id);
        tasksObj[toDoListID] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, toDoListID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let taskFind = tasksObj[toDoListID]
        let newTasks = [task, ...taskFind];
        tasksObj[toDoListID] = newTasks
        setTasks({...tasksObj});
    }


    const changeStatus = (taskId: string, isDone: boolean, toDoListID: string) => {
        let changeStatusFind = tasksObj[toDoListID]
        let taskStatus = changeStatusFind.find(t => t.id === taskId)
        if (taskStatus) {
            taskStatus.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const toDoListMainID1 = v1()
    const toDoListMainID2 = v1()
    const [toDoListArray, setToDoListArray] = useState<Array<ToDoListArrayType>>([
        {id: toDoListMainID1, title: 'What to learn?', filter: 'all'},
        {id: toDoListMainID2, title: 'What to buy?', filter: 'all'},
    ])
    // let [tasksObj, setTasks] = useState([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Rest API', isDone: false},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    //
    // ]);

    let [tasksObj, setTasks] = useState({
        [toDoListMainID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [toDoListMainID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Breed', isDone: true},
            {id: v1(), title: 'Cola', isDone: false},
        ]
    });


    function changeFilter(value: FilterValuesType, toDoListID: string) {
        const taskFilter = toDoListArray.find(tl => tl.id === toDoListID)
        if (taskFilter) {
            taskFilter.filter = value
            console.log(taskFilter.filter = value)
            setToDoListArray([...toDoListArray])
        }
    }

    const toDoList = toDoListArray.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];
        if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }

        const removeToDoList = (toDoListID: string) => {
            let toDoListRemove = toDoListArray.filter(tl => tl.id !== toDoListID)
            setToDoListArray(toDoListRemove)
            delete tasksObj[toDoListID]
            setTasks({...tasksObj})
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
            {toDoList}

        </div>
    );
}

export default App;
