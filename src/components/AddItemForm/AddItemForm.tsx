import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItems: (title: string) => void
}


export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItems(title.trim());
            setTitle('');
        } else {
            setError('error')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addTask();
        } else if (e.key === 'Enter' && e.ctrlKey) {
            setError('error')
        }
    }

    return (
        <div>
            <input className={error ? 'error-border' : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            <div className="height">
                {error ? <span className="error-text">Field text undefined</span> : ''}
            </div>
        </div>
    )
}