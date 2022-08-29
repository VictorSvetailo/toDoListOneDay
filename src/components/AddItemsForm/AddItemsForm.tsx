import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemsFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemsForm(props: AddItemsFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
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
            addItem();
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
            <button onClick={addItem}>+</button>
            <div className="height">
                {error ? <span className="error-text">Field text undefined</span> : ''}
            </div>
        </div>
    )
}